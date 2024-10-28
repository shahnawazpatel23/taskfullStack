import os
from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from app import models, crud, nlp, file_storage
from app.database import SessionLocal, engine
from pydantic import BaseModel

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI application
app = FastAPI()

# Add CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://localhost:5173/","http://localhost:5173/*"],  # Adjust to frontend's URL
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Create a directory for storing uploaded PDFs if it doesn't exist
UPLOAD_DIRECTORY = "uploads"
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/upload_pdf/")
async def upload_pdf(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # Verify file type (ensure it's a PDF)
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    # Save the uploaded PDF locally
    file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)
    with open(file_location, "wb") as f:
        f.write(await file.read())

    # Extract text from the PDF
    text_content = file_storage.extract_text_from_pdf(file_location)

    # Store metadata in the database
    document = crud.create_document(db=db, filename=file.filename, file_path=file_location)

    return {"file_id": document.id, "filename": file.filename}


class QuestionRequest(BaseModel):
    file_id: int
    question: str


@app.post("/ask_question")
async def ask_question(request: QuestionRequest, db: Session = Depends(get_db)):
    # Retrieve document from the database
    print("entered here") 
    document = crud.get_document(db, request.file_id)
    print("Document in ask_question is:", document)  # Replaced with print
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")

    # Read the PDF file content from local storage
    file_path = document.file_path
    print("File path is:", file_path)  # Replaced with print
    document_text = file_storage.extract_text_from_pdf(file_path)
    print("Document text is:", document_text)  # Replaced with print

    # Use LangChain to answer the question
    answer = nlp.answer_question(document_text, request.question)
    return {"answer": answer}
