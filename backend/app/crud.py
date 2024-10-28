from sqlalchemy.orm import Session
from . import models

def create_document(db: Session, filename: str, file_path: str):
    db_document = models.Document(filename=filename, file_path=file_path)
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

def get_document(db: Session, document_id: int):
    return db.query(models.Document).filter(models.Document.id == document_id).first()
