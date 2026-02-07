"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QrCode, CheckCircle, Clock, History, AlertCircle, Camera, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { QRCodeSVG } from 'qrcode.react';
import api from '@/lib/axios';

import DashboardLayout from '@/components/DashboardLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface AttendanceLog {
  id: string;
  sessionId: string;
  sessionName: string;
  timestamp: string;
}

export default function AttendancePage() {
  const { user } = useAuthStore();
  const [history, setHistory] = useState<AttendanceLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [generatedQR, setGeneratedQR] = useState('');

  // Mock Professor Data
  const isProfessor = user?.role === 'admin' || user?.role === 'professor';

  useEffect(() => {
    fetchHistory();
    if (isProfessor) {
      generateNewCode();
    }
  }, [isProfessor]);

  const generateNewCode = () => {
    const newSessionId = `SESSION-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    setGeneratedQR(newSessionId);
    toast.success("تم توليد كود جديد للمحاضرة");
  };

  const fetchHistory = async () => {
    try {
      const response = await api.get('/attendance/history');
      if (response.data && response.data.data) {
        setHistory(response.data.data);
      }
    } catch (error) {
      console.error('Attendance fetch detailed error:', error);
      const axiosError = error as { response?: { status: number } };
      if (axiosError.response?.status === 401) {
          toast.error("جلسة العمل انتهت، يرجى تسجيل الدخول مجدداً");
      }
    }
  };

  const handleMarkAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsLoading(true);
    try {
      await api.post('/attendance/mark', {
        sessionId: code,
        sessionName: "محاضرة اليوم",
      });
      toast.success("تم تسجيل حضورك بنجاح! 🎉");
      setCode('');
      fetchHistory();
    } catch (error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      toast.error(axiosError.response?.data?.message || "فشل تسجيل الحضور");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <QrCode className="text-blue-600" />
                نظام الحضور الذكي
              </h1>
              <p className="text-gray-500 mt-1">سجل حضورك بلمسة واحدة عبر QR Code</p>
            </div>
            {isProfessor && (
              <Button 
                onClick={generateNewCode}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2 shadow-lg"
              >
                <RefreshCw size={18} />
                توليد كود جديد للمحاضرة
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input / QR Display Section */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-xl border border-blue-50 p-8 text-center"
              >
                {isProfessor ? (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900">كود الحضور للمحاضرة الحالية</h2>
                    <div className="p-6 bg-white border-4 border-blue-100 rounded-3xl inline-block shadow-inner">
                      <QRCodeSVG 
                        value={generatedQR} 
                        size={200}
                        level="H"
                        includeMargin={true}
                      />
                    </div>
                    <div className="bg-blue-50 py-3 px-6 rounded-full inline-block">
                      <span className="text-blue-700 font-black text-2xl tracking-widest">{generatedQR}</span>
                    </div>
                    <p className="text-gray-500 text-sm">اطلب من الطلاب مسح الرمز أعلاه أو إدخال الكود يدوياً</p>
                  </div>
                ) : !showScanner ? (
                  <div className="space-y-6">
                    <div className="mx-auto w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                      <QrCode size={40} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">أدخل كود المحاضرة</h2>
                    <form onSubmit={handleMarkAttendance} className="max-w-xs mx-auto space-y-4">
                      <Input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="مثال: SESSION-ABC123"
                        className="text-center text-lg font-bold tracking-widest uppercase"
                      />
                      <Button
                        type="submit"
                        isLoading={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg rounded-xl shadow-lg shadow-blue-200"
                      >
                        تسجيل الحضور
                      </Button>
                    </form>
                    <div className="pt-4">
                      <button
                        onClick={() => setShowScanner(true)}
                        className="text-blue-600 font-medium flex items-center justify-center gap-2 mx-auto hover:underline"
                      >
                        <Camera size={18} />
                        أو استخدم الماسح الضوئي (QR Scanner)
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 py-12">
                     <div className="w-64 h-64 mx-auto border-4 border-dashed border-blue-400 rounded-3xl flex items-center justify-center bg-gray-50 relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-500/10 animate-pulse"></div>
                        <Camera size={48} className="text-gray-400" />
                     </div>
                     <p className="text-gray-500">قم بتوجيه الكاميرا نحو الكود</p>
                     <Button variant="outline" onClick={() => setShowScanner(false)}>إلغاء</Button>
                  </div>
                )}
              </motion.div>

              {/* Status Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-2xl border border-green-100 flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-bold">الحضور اليوم</div>
                    <div className="text-xs text-green-600">لم يتم تسجيل غياب اليوم</div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-bold">إجمالي الحضور</div>
                    <div className="text-xs text-blue-600">{history.length} محاضرات حضور</div>
                  </div>
                </div>
              </div>
            </div>

            {/* History Section */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <History size={20} className="text-blue-600" />
                  السجل الأخير
                </h3>
                <div className="space-y-4">
                  {history.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors border-l-4 border-green-500">
                      <div className="mt-1">
                        <CheckCircle size={16} className="text-green-500" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-sm">{log.sessionName}</div>
                        <div className="text-[10px] text-gray-400 mt-1">
                          {new Date(log.timestamp).toLocaleDateString('ar-EG', {
                            weekday: 'long',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                  {history.length === 0 && (
                    <div className="text-center py-6 text-gray-400 text-sm italic">
                      لا يوجد سجل حضور حتى الآن
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                <div className="flex items-center gap-2 text-amber-800 font-bold mb-2">
                  <AlertCircle size={18} />
                  تنبيه هام
                </div>
                <p className="text-xs text-amber-700 leading-relaxed">
                  يجب أن يكون موقعك الجغرافي مفعلاً لتتمكن من تسجيل الحضور للتأكد من وجودك داخل الحرم الجامعي.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
