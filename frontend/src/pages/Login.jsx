import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2, ArrowUpRight, Lock, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const from = location.state?.from?.pathname || '/dashboard';

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await login(data);
      toast.success('Logged in successfully!');
      navigate(from, { replace: true });
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.non_field_errors?.[0] ||
        'Invalid email or password. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#F7F7F3] flex items-center justify-center px-4 py-16 text-[#111111]">
      <div className="max-w-md w-full bg-[#ECECE7] border border-black/10 p-8 md:p-10 space-y-8">
        <div className="space-y-3">
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#68705A]">
            Account Access
          </div>
          <h1 className="text-3xl md:text-4xl font-normal tracking-[-0.05em] text-[#111111]">
            Welcome back.
          </h1>
          <p className="text-xs text-black/60 font-light">
            Sign in to manage your requests, schedules, and service activity.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Email Field */}
          <div className="space-y-1">
            <label className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-black/50">
              Email Address
            </label>
            <div className="relative border-b border-black/20 focus-within:border-[#68705A] transition-colors py-1 flex items-center">
              <Mail className="w-4 h-4 text-black/40 mr-2" />
              <input
                type="email"
                placeholder="name@example.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full bg-transparent text-sm text-[#111111] placeholder:text-black/30 focus:outline-none py-1"
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-red-600 font-medium pt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-black/50">
              Password
            </label>
            <div className="relative border-b border-black/20 focus-within:border-[#68705A] transition-colors py-1 flex items-center">
              <Lock className="w-4 h-4 text-black/40 mr-2" />
              <input
                type="password"
                placeholder="••••••••"
                {...register('password', {
                  required: 'Password is required',
                })}
                className="w-full bg-transparent text-sm text-[#111111] placeholder:text-black/30 focus:outline-none py-1"
              />
            </div>
            {errors.password && (
              <p className="text-[11px] text-red-600 font-medium pt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 bg-[#111111] hover:bg-[#68705A] text-white font-medium text-xs uppercase tracking-wider transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Log In</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="pt-6 border-t border-black/10 text-center">
          <p className="text-xs text-black/60 font-light">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-[#111111] underline hover:text-[#68705A] transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

