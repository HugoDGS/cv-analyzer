import os
import json
from openai import OpenAI
import anthropic
from .prompts import SYSTEM_PROMPT, build_user_prompt

PROVIDER = os.getenv("LLM_PROVIDER", "openai")


def analyze(cv_text: str, job_description: str | None = None) -> dict:
    prompt = build_user_prompt(cv_text, job_description)
    if PROVIDER == "anthropic":
        return _anthropic(prompt)
    return _openai(prompt)


def _openai(prompt: str) -> dict:
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    res = client.chat.completions.create(
        model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ],
        response_format={"type": "json_object"},
        temperature=0.3,
    )
    return json.loads(res.choices[0].message.content)


def _anthropic(prompt: str) -> dict:
    client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    res = client.messages.create(
        model=os.getenv("ANTHROPIC_MODEL", "claude-haiku-4-5-20251001"),
        max_tokens=2048,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
    )
    return json.loads(res.content[0].text)
