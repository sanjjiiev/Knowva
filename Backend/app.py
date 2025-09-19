# app.py
import os
import shutil
import uuid
from pathlib import Path
from typing import Optional

import openai
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse

from graph import graph        # LangGraph workflow
from db import init_db, save_interaction, fetch_past_prompts
from doc_utils import extract_text_from_file, ensure_audio_format

# ----------------------------
# Init
# ----------------------------
init_db()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise EnvironmentError("Set OPENAI_API_KEY in environment")
openai.api_key = OPENAI_API_KEY

ASR_MODEL = os.getenv("ASR_MODEL", "whisper-1")

app = FastAPI(title="LMS CrewAI + LangGraph API")

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


def save_upload_file_tmp(upload_file: UploadFile) -> str:
    """Save uploaded file to a tmp path and return full path."""
    suffix = Path(upload_file.filename).suffix if upload_file.filename else ""
    tmp_name = f"{uuid.uuid4().hex}{suffix}"
    tmp_path = os.path.join(UPLOAD_DIR, tmp_name)
    with open(tmp_path, "wb") as out:
        shutil.copyfileobj(upload_file.file, out)
    return tmp_path


# ----------------------------
# API Routes
# ----------------------------

@app.post("/process")
async def process(
    user_id: str = Form(...),
    text_input: Optional[str] = Form(None),
    audio: Optional[UploadFile] = File(None),
    document: Optional[UploadFile] = File(None)
):
    """
    Accepts text, audio, and/or document input.
    Runs LangGraph flow (Explanation -> Practice -> Revision).
    Returns explanation, practice, revision.
    """
    combined_context_parts = []

    # 1) Text input
    if text_input:
        combined_context_parts.append(f"User text input:\n{text_input}")

    # 2) Audio input
    if audio:
        audio_path = save_upload_file_tmp(audio)
        try:
            wav_out = audio_path + ".wav"
            ensure_audio_format(audio_path, wav_out)
            trans_path = wav_out
        except Exception:
            trans_path = audio_path
        with open(trans_path, "rb") as fh:
            transcript = openai.Audio.transcribe(model=ASR_MODEL, file=fh)
            if isinstance(transcript, dict):
                text = transcript.get("text", "")
            else:
                text = str(transcript)
            combined_context_parts.append(f"Audio transcript:\n{text}")

    # 3) Document input
    if document:
        doc_path = save_upload_file_tmp(document)
        doc_text = extract_text_from_file(doc_path)
        if doc_text:
            combined_context_parts.append(f"Document extracted text:\n{doc_text}")

    # Combine all context
    combined_context = "\n\n---\n\n".join(combined_context_parts).strip()
    if not combined_context:
        return JSONResponse(
            {"error": "No input provided. Provide text_input, or upload audio/document."},
            status_code=400,
        )

    # Save pending entry
    save_interaction(user_id, combined_context, "pending")

    # Run LangGraph workflow
    state_input = {
        "user_id": user_id,
        "query": text_input or "",
        "context": combined_context,
        "db_fetch_fn": fetch_past_prompts,
    }
    result_state = graph.invoke(state_input)

    explanation = result_state.get("explanation", "")
    practice = result_state.get("practice", "")
    revision = result_state.get("revision", "")

    # Save final response
    combined_response = f"Explanation:\n{explanation}\n\nPractice:\n{practice}\n\nRevision:\n{revision}"
    save_interaction(user_id, combined_context, combined_response)

    return {
        "explanation": explanation,
        "practice": practice,
        "revision": revision,
    }


@app.get("/health")
def health():
    return {"status": "ok"}
