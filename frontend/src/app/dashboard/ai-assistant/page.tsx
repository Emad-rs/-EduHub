"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, Trash2, FileText, Paperclip } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import DashboardLayout from '@/components/DashboardLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/Button';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'مرحباً بك! أنا مساعد EduHub الذكي. كيف يمكنني مساعدتك في رحلتك الدراسية اليوم؟',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [hasContext, setHasContext] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('يرجى اختيار ملف PDF فقط');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:8000/ai/upload-pdf?session_id=user_1', formData);
      setHasContext(true);
      toast.success('تم رفع وتحليل الكتاب بنجاح! 📑');
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: `تم تحميل ملف "${file.name}". يمكنك الآن سؤالي عن محتواه!`,
        role: 'assistant',
        timestamp: new Date()
      }]);
    } catch {
      toast.error('فشل في تحليل الملف');
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Direct call to AI service (configured port 8000 in Python)
      const response = await axios.post('http://localhost:8000/ai/chat', {
        message: input,
        session_id: 'user_1' // Match the session_id used in upload
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Service Error:', error);
      toast.error('لم أتمكن من الاتصال بخدمة الذكاء الاصطناعي. تأكد من تشغيل السيرفر.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'تم مسح المحادثة. كيف يمكنني مساعدتك مجدداً؟',
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-4xl mx-auto h-[calc(100vh-180px)] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 shrink-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Bot className="text-indigo-600" />
                المساعد الذكي
              </h1>
              <p className="text-gray-500 mt-1">مدعوم بالذكاء الاصطناعي لدعم دراستك</p>
            </div>
            <button
              onClick={clearChat}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              title="مسح المحادثة"
            >
              <Trash2 size={20} />
            </button>
          </div>

          {/* Chat Container */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'} gap-3`}
                  >
                    <div className={`flex gap-3 max-w-[80%] ${msg.role === 'assistant' ? 'flex-row-reverse' : ''}`}>
                      <div className={`h-8 w-8 rounded-full shrink-0 flex items-center justify-center ${
                        msg.role === 'assistant' 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
                      </div>
                      <div className={`p-4 rounded-2xl shadow-sm ${
                        msg.role === 'assistant'
                          ? 'bg-indigo-50 text-indigo-900 rounded-tr-none'
                          : 'bg-white border border-gray-100 text-gray-900 rounded-tl-none'
                      }`}>
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        <span className="text-[10px] opacity-50 block mt-2">
                          {msg.timestamp.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end gap-3">
                   <div className="flex gap-3 flex-row-reverse">
                      <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center animate-pulse">
                        <Bot size={18} />
                      </div>
                      <div className="bg-indigo-50 p-4 rounded-2xl shadow-sm">
                        <div className="flex gap-1">
                          <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce"></span>
                          <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                          <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
                        </div>
                      </div>
                   </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white border-t border-gray-100">
              <div className="flex flex-wrap gap-4 mb-4">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept=".pdf" 
                  className="hidden" 
                />
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="rounded-full gap-2 border-gray-200 hover:bg-gray-50 flex items-center h-10 px-4"
                >
                  <Paperclip size={16} className={isUploading ? "animate-spin" : ""} />
                  <span className="text-xs font-bold">
                    {isUploading ? 'جاري التحليل...' : 'رفع كتاب PDF'}
                  </span>
                </Button>

                {hasContext && (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full border border-green-100">
                    <FileText size={14} />
                    <span className="text-xs font-bold">تم تحليل الملف ✓</span>
                  </div>
                )}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-3"
              >
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={hasContext ? "اسألني عن محتوى الكتاب..." : "اكتب استفسارك هنا..."}
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-indigo-500 transition-all text-right"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl p-4 h-14 w-14 shadow-lg shadow-indigo-100 flex items-center justify-center shrink-0"
                >
                  <Send size={24} className="transform -rotate-90" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
