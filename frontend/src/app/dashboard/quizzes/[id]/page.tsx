"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, Trophy } from 'lucide-react';
import { toast } from 'react-hot-toast';

import DashboardLayout from '@/components/DashboardLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useQuizStore } from '@/store/quizStore';
import { Button } from '@/components/ui/Button';

export default function QuizSolverPage() {
  const { id } = useParams();
  const router = useRouter();
  const { currentQuiz, fetchQuizById, isLoading } = useQuizStore();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (id) fetchQuizById(id as string);
  }, [id, fetchQuizById]);

  useEffect(() => {
    if (currentQuiz) {
      setTimeLeft(currentQuiz.duration * 60);
    }
  }, [currentQuiz]);

  // Timer Logic
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted && currentQuiz) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted, currentQuiz]);

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    const questionId = currentQuiz?.questions?.[currentQuestionIndex]?.id;
    if (questionId) {
      setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    }
  };

  const handleSubmit = () => {
    if (!currentQuiz || !currentQuiz.questions) return;
    
    let correctCount = 0;
    currentQuiz.questions.forEach(q => {
      if (answers[q.id] === q.correctOption) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / currentQuiz.questions.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
    toast.success("تم تسليم الاختبار بنجاح!");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading || !currentQuiz) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-500">جاري تحميل الاختبار...</p>
        </div>
      </DashboardLayout>
    );
  }

  const questions = currentQuiz.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  if (isSubmitted) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="max-w-2xl mx-auto py-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-xl p-12 text-center border border-indigo-50"
            >
              <div className="mx-auto w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-6">
                <Trophy size={48} className="animate-bounce" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">تهانينا! 🎉</h2>
              <p className="text-gray-500 mb-8">لقد أكملت اختبار: {currentQuiz.title}</p>
              
              <div className="bg-indigo-600 text-white rounded-2xl p-8 mb-8">
                <div className="text-sm opacity-80 mb-1">نسبة النجاح</div>
                <div className="text-6xl font-black">{score}%</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="text-xs text-gray-400 mb-1">الإجابات الصحيحة</div>
                  <div className="text-xl font-bold text-green-600">
                    {Math.round((score / 100) * questions.length)} / {questions.length}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="text-xs text-gray-400 mb-1">الحالة</div>
                  <div className={`text-xl font-bold ${score >= 50 ? 'text-indigo-600' : 'text-red-500'}`}>
                    {score >= 50 ? 'ناجح' : 'راسب'}
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => router.push('/dashboard/quizzes')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-14 rounded-xl text-lg font-bold"
              >
                العودة لقائمة الاختبارات
              </Button>
            </motion.div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          {/* Header & Progress */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{currentQuiz.title}</h1>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <HelpCircle size={14} />
                  السؤال {currentQuestionIndex + 1} من {questions.length}
                </span>
                <span className={`text-sm font-bold flex items-center gap-1 ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-indigo-600'}`}>
                  <Clock size={16} />
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
            
            <div className="w-full md:w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 mb-8 min-h-[400px] flex flex-col"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
                {currentQuestion.text}
              </h2>

              <div className="space-y-4 flex-1">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-5 rounded-2xl text-right transition-all flex items-center justify-between group border-2 ${
                      answers[currentQuestion.id] === idx
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-gray-50 bg-gray-50 hover:bg-gray-100 text-gray-700 hover:border-gray-200'
                    }`}
                  >
                    <span className="font-bold text-lg">{option}</span>
                    <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQuestion.id] === idx
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-gray-300 group-hover:border-gray-400'
                    }`}>
                      {answers[currentQuestion.id] === idx && <div className="h-2 w-2 bg-white rounded-full"></div>}
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-50">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                  disabled={currentQuestionIndex === 0}
                  className="rounded-xl px-6 gap-2"
                >
                  <ArrowRight size={18} />
                  السابق
                </Button>

                {currentQuestionIndex === questions.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-12 font-bold shadow-lg shadow-indigo-100"
                  >
                    تسجيل الإجابات وإنهاء
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                    disabled={answers[currentQuestion.id] === undefined}
                    className="bg-gray-900 hover:bg-black text-white rounded-xl px-8 gap-2 group"
                  >
                    التالي
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Warning */}
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-4 rounded-xl border border-amber-100">
            <AlertCircle size={18} />
            <p className="text-sm font-medium">سيتم تسليم الاختبار تلقائياً عند انتهاء الوقت المحدد.</p>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

// Missing Lucide icons
function HelpCircle({ size }: { size: number }) {
  return <HelpCircleIcon size={size} />;
}
import { HelpCircle as HelpCircleIcon } from 'lucide-react';
