import io
import re
import pdfplumber
from fastapi import UploadFile


async def extract_text(file: UploadFile) -> str:
    content = await file.read()
    with pdfplumber.open(io.BytesIO(content)) as pdf:
        pages = [page.extract_text() or "" for page in pdf.pages]

    text = "\n".join(pages)
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r' {2,}', ' ', text)
    return text.strip()
