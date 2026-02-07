"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Book as BookIcon, User, Download, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import DashboardLayout from '@/components/DashboardLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useLibraryStore } from '@/store/libraryStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

// Validation Schema for Adding Book
const addBookSchema = z.object({
  title: z.string().min(2, "العنوان مطلوب"),
  author: z.string().min(2, "المؤلف مطلوب"),
  description: z.string().min(10, "الوصف يجب أن يكون 10 أحرف على الأقل"),
  category: z.string().min(2, "التصنيف مطلوب"),
  coverUrl: z.string().url("رابط صورة غير صحيح").optional().or(z.literal('')),
  pdfUrl: z.string().url("رابط PDF غير صحيح").optional().or(z.literal('')),
});

type AddBookFormValues = z.infer<typeof addBookSchema>;

export default function LibraryPage() {
  const { books, fetchBooks, addBook, isLoading } = useLibraryStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddBookFormValues>({
    resolver: zodResolver(addBookSchema),
  });

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = async (data: AddBookFormValues) => {
    try {
      await addBook(data);
      toast.success("تم إضافة الكتاب بنجاح! 📚");
      setIsModalOpen(false);
      reset();
    } catch (error) {
      toast.error("فشل إضافة الكتاب");
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <BookIcon className="text-blue-600" />
                المكتبة الرقمية
              </h1>
              <p className="text-gray-500 mt-1">تصفح وشارك المصادر التعليمية</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="بحث عن كتاب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4 pr-10 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64 text-gray-900"
                />
              </div>
              <Button onClick={() => setIsModalOpen(true)} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                <Plus size={20} />
                <span className="hidden sm:inline">أضف كتاباً</span>
              </Button>
            </div>
          </div>

          {/* Books Grid */}
          {isLoading && books.length === 0 ? (
             <div className="text-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredBooks.map((book) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col h-full"
                  >
                    <div className="h-48 bg-gray-100 relative overflow-hidden group">
                      {book.coverUrl ? (
                        <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-200">
                          <BookIcon size={64} />
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        {book.pdfUrl && (
                             <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-50 transition-colors">
                               <Download size={20} />
                             </a>
                        )}
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2">
                         <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-md font-medium">
                            {book.category}
                         </span>
                      </div>
                      
                      <h3 className="font-bold text-gray-900 mt-2 line-clamp-1">{book.title}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <User size={14} />
                        {book.author}
                      </p>
                      
                      <p className="text-sm text-gray-600 mt-3 line-clamp-2 flex-1">
                        {book.description}
                      </p>
                      
                      <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs text-gray-400">
                        <span>بواسطة: {book.uploader?.name || 'مجهول'}</span>
                        <span>{new Date(book.createdAt).toLocaleDateString('ar-EG')}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
          
          {filteredBooks.length === 0 && !isLoading && (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                  <BookIcon size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">لا توجد كتب بعد</h3>
                  <p className="text-gray-500">كن أول من يضيف كتاباً للمكتبة!</p>
              </div>
          )}

          {/* Add Book Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden"
              >
                <div className="p-6 border-b flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">إضافة كتاب جديد</h2>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                  <Input placeholder="عنوان الكتاب" label="العنوان" error={errors.title?.message} {...register('title')} />
                  <Input placeholder="اسم المؤلف" label="المؤلف" error={errors.author?.message} {...register('author')} />
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">التصنيف</label>
                    <select {...register('category')} className="w-full p-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">اختر التصنيف</option>
                      <option value="cs">علوم حاسب</option>
                      <option value="math">رياضيات</option>
                      <option value="physics">فيزياء</option>
                      <option value="literature">أدب</option>
                      <option value="history">تاريخ</option>
                    </select>
                    {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                     <label className="text-sm font-medium text-gray-900">الوصف</label>
                     <textarea 
                        {...register('description')} 
                        className="w-full p-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                        placeholder="اكتب وصفاً مختصراً للكتاب..."
                     ></textarea>
                     {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                  </div>

                  <Input placeholder="https://example.com/cover.jpg" label="رابط الغلاف (اختياري)" error={errors.coverUrl?.message} {...register('coverUrl')} />
                  <Input placeholder="https://example.com/book.pdf" label="رابط الملف (PDF, اختياري)" error={errors.pdfUrl?.message} {...register('pdfUrl')} />
                  
                  <div className="pt-4 flex gap-3">
                     <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">إلغاء</Button>
                     <Button type="submit" isLoading={isLoading} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">إضافة الكتاب</Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
