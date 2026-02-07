from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import io
from dotenv import load_dotenv
from pypdf import PdfReader

load_dotenv()

app = FastAPI(title="EduHub AI Service")

# CORS Settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global store for PDF context (In-memory for simplicity)
pdf_context = {}

class ChatRequest(BaseModel):
    message: str
    session_id: str = "default"

@app.get("/")
async def root():
    return {"message": "EduHub AI Service is running with PDF support"}

@app.post("/ai/upload-pdf")
async def upload_pdf(session_id: str, file: UploadFile = File(...)):
    try:
        content = await file.read()
        pdf = PdfReader(io.BytesIO(content))
        text = ""
        for page in pdf.pages:
            text += page.extract_text() + "\n"
        
        # Limit text size for this demo
        pdf_context[session_id] = text[:5000] 
        
        return {
            "success": True, 
            "message": "تم تحليل الملف بنجاح! يمكنك الآن سؤالي عن محتواه.",
            "pages": len(pdf.pages)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"خطأ في قراءة PDF: {str(e)}")

@app.post("/ai/chat")
async def chat(request: ChatRequest):
    try:
        user_message = request.message.lower()
        context = pdf_context.get(request.session_id, "")
        
        # If we have context, simulated localized AI behavior
        if context:
            if "لخص" in user_message or "ملخص" in user_message:
                response = f"بناءً على الملف المرفوع، يدور الموضوع الأساسي حول {context[:200]}... باختصار، الملف يناقش نقاطاً أكاديمية هامة."
            elif "المحتوى" in user_message:
                response = f"يحتوي هذا الملف على معلومات تتعلق بـ: {context[:300]}."
            else:
                response = f"سؤال جيد! بناءً على الملف الذي زودتني به: المحتوى يتحدث عن موضوع تخصصي بعمق. هل تود أن أبحث لك عن معلومة محددة داخل النص؟"
        else:
            # Default general responses
            if "مرحباً" in user_message or "هلا" in user_message:
                response = "مرحباً بك! أنا مساعد EduHub الذكي، كيف يمكنني مساعدتك اليوم؟"
            elif "جدول" in user_message:
                response = "يمكنني مساعدتك في تنظيم جدولك الدراسي."
            else:
                response = f"أنا هنا لمساعدتك! لم تقم برفع ملف PDF بعد، ولكن يمكنني الإجابة على استفساراتك العامة."
            
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
