# Task Full Stack Application

A full-stack application allowing users to upload PDF documents and ask questions about their content. This project uses NLP to process the document content and respond to user queries.


## Features
- **Upload PDFs** and store them in local storage.
- **Ask questions** related to PDF content.
- **Real-time chat interface** for interacting with the document content.
- **NLP processing** with LangChain and LlamaIndex.

## Tech Stack
- **Frontend**: React.js
- **Backend**: FastAPI
- **Database**: SQLite or PostgreSQL (for metadata)
- **NLP**: LangChain (OpenAI API) or LlamaIndex
- **Storage**: Local file storage for PDFs

## Installation

### Prerequisites
- Python 3.8+
- Node.js & npm
- Virtual Environment (`venv`)

### Backend Setup
1. Clone the repository and navigate to the backend folder:
   
         git clone https://github.com/shahnawazpatel23/taskfullStack.git
         cd taskfullStack/backend
   
set up virtual environment:

          python3 -m venv venv
          source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

install dependencies:

          pip install -r requirements.txt
set up env variable:

          OPENAI_API_KEY=your_openai_api_key
run fastAPI server:

          uvicorn main:app --reload
          
Frontend Setup
Navigate to the frontend folder:

    cd ../frontend
Install dependencies:

    npm install
Run the frontend server:

    npm run dev
