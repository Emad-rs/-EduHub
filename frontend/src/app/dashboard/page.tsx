"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Trophy, 
  Clock, 
  TrendingUp,
  MessageSquare,
  Activity as ActivityIcon,
  ChevronRight,
  Star
} from "lucide-react";
import Link from "next/link";

import DashboardLayout from "@/components/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuthStore } from "@/store/authStore";
import { useStatsStore } from "@/store/statsStore";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { stats, fetchStats, isLoading } = useStatsStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const statCards = [
    { 
      label: "الكتب المقروءة", 
      value: stats?.booksRead || 0, 
      icon: BookOpen, 
      color: "bg-blue-500", 
      lightColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    { 
      label: "المنشورات", 
      value: stats?.communityPosts || 0, 
      icon: MessageSquare, 
      color: "bg-purple-500", 
      lightColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    { 
      label: "ساعات الدراسة", 
      value: stats?.studyHours || 0, 
      icon: Clock, 
      color: "bg-orange-500", 
      lightColor: "bg-orange-50",
      textColor: "text-orange-600"
    },
    { 
      label: "الحضور", 
      value: stats?.attendanceSessions || 0, 
      icon: ActivityIcon, 
      color: "bg-green-500", 
      lightColor: "bg-green-50",
      textColor: "text-green-600"
    },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8 max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="bg-linear-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Trophy size={160} />
            </div>
            <div className="relative z-10">
              <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold mb-4 inline-block">
                مرحباً بعودتك، {user?.role === 'admin' ? 'القائد' : user?.role === 'professor' ? 'الدكتور' : 'البطل'} 👋
              </span>
              <h1 className="text-4xl font-black mb-2">أهلاً بك يا {user?.name}!</h1>
              <p className="text-indigo-100 text-lg max-w-xl">
                لديك {stats?.availableQuizzes} اختبارات جديدة بانتظارك وأنشطة مجتمعية رائعة اليوم.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative"
              >
                <div className={`absolute -right-4 -bottom-4 opacity-5 group-hover:scale-150 transition-transform`}>
                   <card.icon size={100} />
                </div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`p-3 rounded-2xl ${card.lightColor} ${card.textColor}`}>
                    <card.icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">{card.label}</p>
                    <h3 className="text-2xl font-black text-gray-900">
                      {isLoading ? "..." : card.value}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Learning Progress Cards */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="text-indigo-600" />
                    المستوى الأكاديمي
                  </h2>
                  <Link href="/dashboard/quizzes" className="text-sm text-indigo-600 font-bold hover:underline">عرض كل الاختبارات</Link>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="bg-indigo-600 p-2.5 rounded-xl text-white">
                        <Star size={20} fill="currentColor" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">المعدل التراكمي (GPA)</div>
                        <div className="text-sm text-gray-500">آخر تحديث: اليوم</div>
                      </div>
                    </div>
                    <div className="text-2xl font-black text-indigo-600">{stats?.gpa || "0.0"}</div>
                  </div>

                  <div className="p-4 border border-indigo-100 rounded-2xl bg-indigo-50/30">
                    <div className="flex items-center justify-between mb-2">
                       <span className="font-bold text-gray-800">إنجاز الأهداف الأسبوعية</span>
                       <span className="text-indigo-600 font-black">75%</span>
                    </div>
                    <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-indigo-100">
                       <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          className="h-full bg-linear-to-r from-indigo-500 to-purple-600"
                       />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/dashboard/social" className="group">
                  <div className="bg-purple-600 p-6 rounded-3xl text-white shadow-lg shadow-purple-200 hover:scale-[1.02] transition-all">
                    <MessageSquare className="mb-4" />
                    <h3 className="font-bold text-lg mb-1">المجتمع الأكاديمي</h3>
                    <p className="text-purple-100 text-sm">شارك أفكارك مع زملائك الآن</p>
                  </div>
                </Link>
                <Link href="/dashboard/ai-assistant" className="group">
                  <div className="bg-gray-900 p-6 rounded-3xl text-white shadow-lg shadow-gray-200 hover:scale-[1.02] transition-all">
                    <ActivityIcon className="mb-4 text-indigo-400" />
                    <h3 className="font-bold text-lg mb-1">المساعد الذكي اطلب مساعدة</h3>
                    <p className="text-gray-400 text-sm">تحدث مع AI للحصول على شرح سريع</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Sidebar / Activities */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center justify-between">
                   الأنشطة القادمة
                   <Calendar size={18} className="text-gray-400" />
                </h2>
                <div className="space-y-4">
                  {[1, 2].map((_, i) => (
                    <div key={i} className="flex gap-4 p-3 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer group">
                      <div className="h-12 w-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 font-bold text-xs flex-col shrink-0">
                        <span>15</span>
                        <span className="uppercase">Feb</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm group-hover:text-orange-600 transition-colors">مؤتمر التكنولوجيا السنوي</h4>
                        <p className="text-xs text-gray-500 mt-1">القاعة الرياضية - 10:00 صباحاً</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/dashboard/activities" className="mt-6 flex items-center justify-center gap-1 text-sm font-bold text-orange-600 hover:gap-2 transition-all">
                  عرض كل الأنشطة <ChevronRight size={16} />
                </Link>
              </div>

              {/* Tips Section */}
              <div className="bg-linear-to-br from-amber-400 to-orange-500 p-6 rounded-3xl text-white">
                <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                   <Star size={20} fill="currentColor" />
                </div>
                <h3 className="font-bold mb-1">نصيحة اليوم 💡</h3>
                <p className="text-sm text-amber-50">تكرار المراجعة على فترات متباعدة يزيد من سرعة استرجاع المعلومات بنسبة 40%.</p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
