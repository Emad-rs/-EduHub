"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Sparkles } from "lucide-react";

import api from "@/lib/axios";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuthStore } from "@/store/authStore";

// Validation Schema
const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      // API Call
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      // Save to store
      login(response.data.user, response.data.token);

      toast.success("مرحباً بعودتك! 🎉");
      router.push("/dashboard");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "فشل تسجيل الدخول");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-2xl z-10 relative border border-gray-100"
      >
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-14 w-14 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg transform hover:scale-110 transition-transform">
            <LogIn size={28} />
          </div>
          <h2 className="mt-2 text-3xl font-black text-gray-900 tracking-tight">
            مرحباً بعودتك
          </h2>
          <p className="mt-2 text-base text-gray-600">
            سجل دخولك كطالب، أستاذ، أو مشرف نظام
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
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
          </div>

          {/* Forgot Password */}
          <div className="flex items-center justify-start">
            <Link
              href="/forgot-password"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 hover:underline"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-linear-to-l from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 h-12 text-lg font-bold"
            size="lg"
            isLoading={isLoading}
          >
            <span className="flex items-center justify-center gap-2">
              تسجيل الدخول
              <Sparkles size={18} />
            </span>
          </Button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            ليس لديك حساب؟{" "}
            <Link
              href="/register"
              className="font-bold text-indigo-600 hover:text-indigo-500 hover:underline transition-all"
            >
              سجل الآن مجاناً
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
