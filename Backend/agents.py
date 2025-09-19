# agents.py
import os
import openai
from typing import Optional, Callable, List
from crewai import Agent  # CrewAI agent construct (used as orchestration wrapper)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise EnvironmentError("Set OPENAI_API_KEY in environment variables")
openai.api_key = OPENAI_API_KEY

CHAT_MODEL = os.getenv("CHAT_MODEL", "gpt-4o-mini")
ASR_MODEL = os.getenv("ASR_MODEL", "whisper-1")


def call_chat_system(messages, max_tokens=800, temperature=0.2):
    """
    OpenAI Chat wrapper. Keep deterministic defaults for a demo.
    """
    resp = openai.ChatCompletion.create(
        model=CHAT_MODEL,
        messages=messages,
        max_tokens=max_tokens,
        temperature=temperature,
    )
    return resp["choices"][0]["message"]["content"].strip()


# ---------------------------
# CrewAI agent wrappers
# ---------------------------
# We use CrewAI's Agent as a lightweight descriptor / orchestrator.
# The actual LLM call remains OpenAI for immediate runnability.
# You can later change call_chat_system to point to CrewAI's LLM config if desired.
# ---------------------------

ExplanationAgent = Agent(
    name="ExplanationAgent",
    role="Expert Tutor",
    description="Explains concepts clearly with examples and short takeaways."
)

PracticeAgent = Agent(
    name="PracticeAgent",
    role="Practice Generator",
    description="Generates practice problems and short solutions."
)

RevisionAgent = Agent(
    name="RevisionAgent",
    role="Revision Helper",
    description="Selects short revision questions from user's history."
)


# Each agent exposes a .run(...) function that returns text. This makes integrating with LangGraph easy.

def explanation_run(user_query: str, context: Optional[str] = None) -> str:
    system = (
        "You are an expert teacher. Provide a clear explanation with simple examples, "
        "step-by-step where helpful, and list 2-4 short takeaways at the end."
    )
    prompt = f"Student question: {user_query}\n"
    if context:
        prompt += f"\nContext (notes/documents/voice transcript):\n{context}\n"
    messages = [
        {"role": "system", "content": system},
        {"role": "user", "content": prompt},
    ]
    return call_chat_system(messages, max_tokens=900, temperature=0.2)


def practice_run(user_query: str, context: Optional[str] = None, n_problems: int = 3) -> str:
    system = "You are a practice-generator. Create problems of increasing difficulty and give concise solutions."
    prompt = (
        f"Create {n_problems} practice problems (label them 1..{n_problems}) for the topic from this question: {user_query}\n"
        "Provide a 1-2 sentence solution for each.\n"
    )
    if context:
        prompt += f"\nContext (notes/documents/voice transcript):\n{context}\n"
    messages = [
        {"role": "system", "content": system},
        {"role": "user", "content": prompt},
    ]
    return call_chat_system(messages, max_tokens=800, temperature=0.3)


def revision_run(user_id: str, last_context: Optional[str], db_fetch_fn: Callable[[str], List[str]], n_questions: int = 2) -> str:
    past_items = db_fetch_fn(user_id)
    system = "You are a revision assistant. Select or rephrase past items for quick revision."
    if not past_items:
        prompt = (
            "No previous history found. Instead, produce 2 quick revision questions (short answers) "
            "based on this context:\n" + (last_context or "No context available.")
        )
    else:
        combined = "\n\n".join([f"{i+1}. {p}" for i, p in enumerate(past_items[:10])])
        prompt = (
            f"Here are the user's past items. Produce {n_questions} short revision questions and expect one-line answers. "
            f"Rephrase or adapt them to be good for quick revision.\n\nPast items:\n{combined}\n"
        )
        if last_context:
            prompt += f"\nCurrent context (if helpful):\n{last_context}\n"

    messages = [
        {"role": "system", "content": system},
        {"role": "user", "content": prompt},
    ]
    return call_chat_system(messages, max_tokens=600, temperature=0.4)


# Attach run methods to CrewAI Agent objects for readability in the graph code
ExplanationAgent.run = explanation_run
PracticeAgent.run = practice_run
RevisionAgent.run = revision_run
