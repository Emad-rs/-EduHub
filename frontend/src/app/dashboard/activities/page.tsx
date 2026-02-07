"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Plus, ListFilter, Search, Clock, Users } from 'lucide-react';
import { toast } from 'react-hot-toast';

import DashboardLayout from '@/components/DashboardLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useActivityStore } from '@/store/activityStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';

export default function ActivitiesPage() {
  const { activities, fetchActivities, isLoading } = useActivityStore();
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');

  const isAdmin = user?.role === 'admin' || user?.role === 'professor';

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const filteredActivities = activities.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="text-orange-600" />
                الأنشطة والفعاليات الطلابية
              </h1>
              <p className="text-gray-500 mt-1">اكتشف الفعاليات الجامعية وانضم لزملائك</p>
            </div>
            {isAdmin && (
              <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl gap-2 shadow-lg shadow-orange-100">
                <Plus size={20} />
                إضافة فعالية جديدة
              </Button>
            )}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="ابحث عن فعالية، ندوة، أو مسابقة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition-all text-gray-900"
              />
            </div>
            <Button variant="outline" className="rounded-xl border-gray-200 gap-2 h-[50px]">
              <ListFilter size={20} />
              تصفية
            </Button>
          </div>

          {/* Activities Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-gray-100 animate-pulse h-[400px] rounded-2xl"></div>
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 overflow-hidden flex flex-col"
                  >
                    {/* Activity Image */}
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                      {activity.imageUrl ? (
                        <img 
                          src={activity.imageUrl} 
                          alt={activity.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-orange-400 to-pink-500 text-white">
                          <Calendar size={48} className="opacity-50" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 shadow-sm">
                        {activity.status === 'upcoming' ? 'قريباً' : 'مباشر'}
                      </div>
                    </div>

                    {/* Activity Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                        {activity.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                        {activity.description}
                      </p>
                      
                      <div className="space-y-3 mt-auto pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock size={16} className="text-orange-500" />
                          <span>{new Date(activity.date).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin size={16} className="text-orange-500" />
                          <span>{activity.location}</span>
                        </div>
                      </div>

                      <Button className="w-full mt-6 bg-gray-50 hover:bg-orange-600 hover:text-white text-gray-900 transition-all rounded-xl font-bold gap-2 group-hover:shadow-lg">
                        تفاصيل الفعالية والتسجيل
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!isLoading && filteredActivities.length === 0 && (
            <div className="text-center py-20">
                <div className="bg-orange-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar size={32} className="text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">لا توجد فعاليات حالياً</h3>
                <p className="text-gray-500">جرب البحث بكلمات أخرى أو انتظر الفعاليات القادمة</p>
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
