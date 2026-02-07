"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Heart, Share2, MoreHorizontal, User } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import DashboardLayout from '@/components/DashboardLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useSocialStore } from '@/store/socialStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';

// Validation Schema
const postSchema = z.object({
  content: z.string().min(1, "لا يمكن نشر محتوى فارغ").max(500, "الحد الأقصى 500 حرف"),
});

type PostFormValues = z.infer<typeof postSchema>;

export default function SocialPage() {
  const { posts, fetchPosts, createPost, isLoading } = useSocialStore();
  const { user } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
  });

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const onSubmit = async (data: PostFormValues) => {
    try {
      await createPost(data);
      toast.success("تم النشر بنجاح! 🚀");
      reset();
    } catch (error) {
      toast.error("فشل نشر المنشور");
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MessageSquare className="text-purple-600" />
              المجتمع الأكاديمي
            </h1>
            <p className="text-gray-500 mt-1">شارك أفكارك وتواصل مع زملائك في EduHub</p>
          </div>

          {/* Create Post Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="flex-1 space-y-3">
                <textarea
                  {...register('content')}
                  placeholder={`بماذا تفكر يا ${user?.name}؟`}
                  className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-purple-200 resize-none h-24 transition-all text-gray-900 placeholder:text-gray-400"
                ></textarea>
                {errors.content && (
                  <p className="text-sm text-red-500">{errors.content.message}</p>
                )}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-6 gap-2"
                  >
                    <Send size={18} />
                    نشر
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Posts Feed */}
          <div className="space-y-6">
            <AnimatePresence>
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    {/* Post Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 shrink-0">
                          <User size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{post.author?.name || 'مستخدم'}</h3>
                          <span className="text-xs text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString('ar-EG', {
                              day: 'numeric',
                              month: 'long',
                              hour: 'numeric',
                              minute: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>

                    {/* Post Content */}
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg">
                      {post.content}
                    </p>

                    {/* Post Stats (Likes) */}
                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-6">
                      <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors">
                           <Heart size={20} className="group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="text-sm font-medium">{post.likes}</span>
                      </button>
                      
                      <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                           <MessageSquare size={20} className="group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="text-sm font-medium">تعليق</span>
                      </button>

                      <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors ml-auto group">
                        <div className="p-2 rounded-full group-hover:bg-green-50 transition-colors">
                           <Share2 size={20} className="group-hover:scale-110 transition-transform" />
                        </div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {posts.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-gray-500">لا توجد منشورات حتى الآن. كن أول من يشارك! ✍️</p>
              </div>
            )}
            
            {isLoading && posts.length === 0 && (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
