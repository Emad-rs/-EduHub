"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, HelpCircle, Trophy, Play, Star } from 'lucide-react';
import Link from 'next/link';

import DashboardLayout from '@/components/DashboardLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useQuizStore } from '@/store/quizStore';
import { Button } from '@/components/ui/Button';

export default function QuizzesPage() {
  const { quizzes, fetchQuizzes, isLoading } = useQuizStore();

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Trophy size={120} />
            </div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">مركز الاختبارات والتقييم 🎯</h1>
              <p className="text-indigo-100 max-w-2xl">
                تحدَّ نفسك واختبر معلوماتك الأكاديمية من خلال مجموعة متنوعة من الاختبارات التفاعلية المصممة لمساعدتك على التفوق.
              </p>
            </div>
          </div>

          {/* Quiz Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
               [1, 2, 3].map(i => (
                 <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-2xl"></div>
               ))
            ) : (
              quizzes.map((quiz, index) => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                      <BookOpen size={24} />
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-lg text-xs font-bold">
                       <Star size={12} className="fill-amber-500" />
                       جديد
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {quiz.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                    {quiz.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-medium text-gray-400 mb-6">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {quiz.duration} دقيقة
                    </div>
                    <div className="flex items-center gap-1.5">
                      <HelpCircle size={14} />
                      10 أسئلة
                    </div>
                  </div>

                  <Link href={`/dashboard/quizzes/${quiz.id}`}>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl gap-2 font-bold py-6">
                      <Play size={18} fill="currentColor" />
                      ابدأ الاختبار الآن
                    </Button>
                  </Link>
                </motion.div>
              ))
            )}
          </div>

          {quizzes.length === 0 && !isLoading && (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
               <HelpCircle size={48} className="mx-auto text-gray-300 mb-4" />
               <h3 className="text-lg font-bold text-gray-600">لا توجد اختبارات متاحة حالياً</h3>
               <p className="text-gray-400 mt-1 text-sm">سيقوم أساتذة المواد بإضافة الاختبارات قريباً.</p>
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
