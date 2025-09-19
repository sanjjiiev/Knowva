# doc_utils.py
import io
import os
import tempfile
from typing import Optional
from pathlib import Path

# PDF
import pdfplumber
# DOCX
import docx
# Images
from PIL import Image
import pytesseract

# Audio -> we will stream file to OpenAI Whisper in app.py directly
# pydub for conversions if needed
from pydub import AudioSegment


def extract_text_from_pdf(path: str) -> str:
    text_parts = []
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            txt = page.extract_text()
            if txt:
                text_parts.append(txt)
    return "\n".join(text_parts)


def extract_text_from_docx(path: str) -> str:
    doc = docx.Document(path)
    paragraphs = [p.text for p in doc.paragraphs if p.text]
    return "\n".join(paragraphs)


def extract_text_from_txt(path: str) -> str:
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        return f.read()


def extract_text_from_image(path: str) -> str:
    img = Image.open(path)
    text = pytesseract.image_to_string(img)
    return text


def extract_text_from_file(saved_path: str) -> str:
    """
    Determine file type by extension and extract text accordingly.
    Fallback: read bytes and attempt OCR if image, else return empty.
    """
    ext = Path(saved_path).suffix.lower()
    if ext == ".pdf":
        return extract_text_from_pdf(saved_path)
    if ext in [".docx", ".doc"]:
        return extract_text_from_docx(saved_path)
    if ext in [".txt"]:
        return extract_text_from_txt(saved_path)
    if ext in [".png", ".jpg", ".jpeg", ".tiff", ".bmp"]:
        return extract_text_from_image(saved_path)

    # Unknown: try reading as text
    try:
        return extract_text_from_txt(saved_path)
    except Exception:
        return ""


def ensure_audio_format(in_path: str, out_path: str):
    """
    Normalize audio to mp3 or wav for safe processing using pydub (ffmpeg required).
    """
    audio = AudioSegment.from_file(in_path)
    audio.export(out_path, format="wav")
    return out_path
