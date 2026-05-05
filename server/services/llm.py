import os
import json
from openai import OpenAI
from .prompts import SYSTEM_PROMPT, build_user_prompt

PROVIDER = os.getenv("LLM_PROVIDER", "openai")


def analyze(cv_text: str, job_description: str | None = None) -> dict:
    prompt = build_user_prompt(cv_text, job_description)
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
