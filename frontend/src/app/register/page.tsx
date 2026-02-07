"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { BookOpen, User, Mail, Lock, Sparkles } from "lucide-react";

import api from "@/lib/axios";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

// Validation Schema
const registerSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  confirmPassword: z.string(),
  role: z.enum(["student", "professor", "admin"], {
    message: "يرجى اختيار نوع الحساب",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "كلمتا المرور غير متطابقتين",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "student",
    }
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      await api.post("/auth/register", data);
      toast.success("تم إنشاء الحساب بنجاح! 🎉");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "فشل إنشاء الحساب");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 left-[-10%] w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-2xl z-10 relative border border-gray-100"
      >
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-14 w-14 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg transform hover:rotate-3 hover:scale-110 transition-all duration-300">
            <BookOpen size={28} />
          </div>
          <h2 className="mt-2 text-3xl font-black text-gray-900 tracking-tight">
            أنشئ حسابك الجديد
          </h2>
          <p className="mt-2 text-base text-gray-600">
            اختر نوع حسابك وابدأ رحلتك التعليمية
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Role Selection Tabs */}
          <div className="grid grid-cols-3 gap-3 p-1 bg-gray-50 rounded-xl border border-gray-100">
            {[
              { id: 'student', label: 'طالب', icon: User },
              { id: 'professor', label: 'أستاذ', icon: Sparkles },
              { id: 'admin', label: 'مشرف', icon: Lock },
            ].map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setValue('role', role.id as "student" | "professor" | "admin")}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-all ${
                  selectedRole === role.id 
                    ? 'bg-white text-blue-600 shadow-sm border border-blue-100' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <role.icon size={18} />
                <span className="text-[10px] font-bold">{role.label}</span>
              </button>
            ))}
          </div>
          {errors.role && <p className="text-xs text-red-500 text-center">{errors.role.message}</p>}

          <div className="space-y-4">
            {/* Name */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 pr-3 flex items-center pointer-events-none text-gray-400 z-10">
                <User size={20} />
              </div>
              <Input
                placeholder="الاسم الكامل"
                className="pr-12 text-right"
                error={errors.name?.message}
                {...register("name")}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 pr-3 flex items-center pointer-events-none text-gray-400 z-10">
                <Mail size={20} />
              </div>
              <Input
                placeholder="البريد الإلكتروني"
                type="email"
                className="pr-12 text-right"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 pr-3 flex items-center pointer-events-none text-gray-400 z-10">
                <Lock size={20} />
              </div>
              <Input
                placeholder="كلمة المرور"
                type="password"
                className="pr-12 text-right"
                error={errors.password?.message}
                {...register("password")}
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 pr-3 flex items-center pointer-events-none text-gray-400 z-10">
                <Lock size={20} />
              </div>
              <Input
                placeholder="تأكيد كلمة المرور"
                type="password"
                className="pr-12 text-right"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-linear-to-l from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 h-12 text-lg font-bold"
            size="lg"
            isLoading={isLoading}
          >
            <span className="flex items-center justify-center gap-2">
              <Sparkles size={18} />
              إنشاء الحساب
            </span>
          </Button>
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            لديك حساب بالفعل؟{" "}
            <Link
              href="/login"
              className="font-bold text-blue-600 hover:text-blue-500 hover:underline transition-all"
            >
              سجل الدخول
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center pt-4 border-t border-gray-200">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
          >
            ← العودة للصفحة الرئيسية
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
