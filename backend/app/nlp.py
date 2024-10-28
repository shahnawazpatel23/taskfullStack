from langchain_openai import OpenAI



import os
from dotenv import load_dotenv

load_dotenv()

def initialize_llm():
    # Fetch the API key from environment variables
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OpenAI API key is not set. Please set the OPENAI_API_KEY environment variable.")
    return OpenAI(api_key=api_key)

def answer_question(document_text: str, question: str) -> str:
    # Initialize the language model
    llm = initialize_llm()
    
    # Prepare the prompt using the document text and question
    prompt = f"Document text:\n{document_text}\n\nQuestion: {question}\nAnswer:"
    
    # Get the answer from the LLM
    answer = llm.invoke(prompt)

    
    return answer
