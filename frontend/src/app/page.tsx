"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, MessageSquare, Bot, Calendar, TrendingUp, ArrowLeft, Sparkles, Star } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'المكتبة الرقمية',
    description: 'الوصول لآلاف الموارد الأكاديمية والكتب والأبحاث العلمية',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    lightColor: 'bg-blue-50',
  },
  {
    icon: MessageSquare,
    title: 'الشبكة الاجتماعية الأكاديمية',
    description: 'تواصل مع زملائك، انضم لمجموعات الدراسة وشارك المعرفة',
    color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    lightColor: 'bg-purple-50',
  },
  {
    icon: Bot,
    title: 'المساعد الذكي بالذكاء الاصطناعي',
    description: 'احصل على مساعدة فورية في دراستك من خلال مدرسنا الذكي',
    color: 'bg-gradient-to-br from-green-500 to-green-600',
    lightColor: 'bg-green-50',
  },
  {
    icon: Calendar,
    title: 'الأنشطة الطلابية',
    description: 'اكتشف الفعاليات وورش العمل والأنشطة اللامنهجية',
    color: 'bg-gradient-to-br from-orange-500 to-orange-600',
    lightColor: 'bg-orange-50',
  },
  {
    icon: TrendingUp,
    title: 'تتبع التقدم الأكاديمي',
    description: 'راقب نموك الأكاديمي وإنجازاتك بشكل مستمر',
    color: 'bg-gradient-to-br from-pink-500 to-pink-600',
    lightColor: 'bg-pink-50',
  },
];

const stats = [
  { number: '10,000+', label: 'طالب نشط' },
  { number: '5,000+', label: 'مورد تعليمي' },
  { number: '500+', label: 'مجموعة دراسية' },
  { number: '98%', label: 'نسبة الرضا' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                E
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
                EduHub
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-gray-700 hover:text-gray-900 font-semibold transition-colors px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/register"
                className="px-6 py-2.5 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center gap-2"
              >
                <Sparkles size={18} />
                ابدأ مجاناً
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 right-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6 font-semibold"
            >
              <Star className="fill-blue-600" size={18} />
              منصتك الأكاديمية الذكية المتكاملة
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
              رفيقك الأكاديمي
              <br />
              <span className="bg-clip-text text-transparent bg-linear-to-l from-blue-600 via-purple-600 to-pink-600">
                الشامل للنجاح
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              EduHub يجمع كل ما تحتاجه للتفوق الأكاديمي - 
              مكتبة رقمية، تعلم اجتماعي، مساعد ذكاء اصطناعي، والمزيد
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/register"
                className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl transition-all font-bold text-lg group"
              >
                ابدأ التعلم مجاناً
                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl hover:shadow-xl transition-all font-bold text-lg border-2 border-gray-200"
              >
                تسجيل الدخول
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-linear-to-l from-blue-600 to-purple-600">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-semibold mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              كل ما تحتاجه للتميز
            </h2>
            <p className="text-xl text-gray-600">
              أدوات قوية مصممة خصيصاً للطلاب العصريين
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:-translate-y-2"
                >
                  <div className={`${feature.lightColor} w-16 h-16 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center shadow-lg`}>
                      <Icon className="text-white" size={24} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-l from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              هل أنت مستعد لتحويل تجربة التعلم؟
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              انضم لآلاف الطلاب الذين يستخدمون EduHub بالفعل
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-100 transition-all shadow-2xl font-bold text-lg group"
            >
              ابدأ الآن مجاناً
              <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-10 w-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
              E
            </div>
            <span className="text-2xl font-bold text-white">EduHub</span>
          </div>
          <p className="text-sm">
            ©  EduHub. رفيقك الأكاديمي الشامل 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
