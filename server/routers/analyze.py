from fastapi import APIRouter, UploadFile, File, HTTPException
from services import pdf, llm

router = APIRouter()


@router.post("/analyze")
async def analyze_cv(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are accepted")

    cv_text = await pdf.extract_text(file)
    if len(cv_text) < 100:
        raise HTTPException(
            status_code=422,
            detail="Could not extract enough text from the PDF"
        )

    try:
        result = llm.analyze(cv_text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
