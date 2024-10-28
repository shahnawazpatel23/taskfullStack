import fitz  # PyMuPDF for PDF text extraction

def extract_text_from_pdf(file_path: str) -> str:
    # Open the PDF file from the path and extract text
    with fitz.open(file_path) as pdf:
        text = ""
        for page_num in range(pdf.page_count):
            page = pdf[page_num]
            text += page.get_text()
    return text

def save_text_locally(text: str, filename: str) -> str:
    local_path = f"documents/{filename}.txt"  # Ensure 'documents' directory exists
    with open(local_path, "w") as text_file:
        text_file.write(text)
    return local_path
