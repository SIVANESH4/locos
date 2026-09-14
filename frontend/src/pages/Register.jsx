import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, Phone, Lock, UserCheck, Wrench, Loader2, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('CUSTOMER');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const payload = {
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: selectedRole,
      };

      await registerUser(payload);
      toast.success('Account created successfully! Please log in.');
      navigate('/login');
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData) {
        if (typeof errorData === 'object') {
          const firstErrorKey = Object.keys(errorData)[0];
          const firstErrorMsg = Array.isArray(errorData[firstErrorKey])
            ? errorData[firstErrorKey][0]
            : errorData[firstErrorKey];
          toast.error(`${firstErrorKey.toUpperCase()}: ${firstErrorMsg}`);
        } else {
          toast.error('Failed to create account. Please check your information.');
        }
      } else {
        toast.error('Network error. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[90vh] bg-[#F7F7F3] flex items-center justify-center px-4 py-16 text-[#111111]">
      <div className="max-w-lg w-full bg-[#ECECE7] border border-black/10 p-8 md:p-10 space-y-8">
        <div className="space-y-3">
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#68705A]">
            Registration
          </div>
          <h1 className="text-3xl md:text-4xl font-normal tracking-[-0.05em] text-[#111111]">
            Create an account.
          </h1>
          <p className="text-xs text-black/60 font-light">
            Select your account type and fill in your details to join Locos.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Role Selection Toggle Cards */}
          <div className="space-y-2">
            <label className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-black/50">
              Select Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole('CUSTOMER')}
                className={`p-4 border text-left transition-all ${
                  selectedRole === 'CUSTOMER'
                    ? 'border-[#68705A] bg-[#F7F7F3] text-[#111111]'
                    : 'border-black/15 bg-transparent text-black/60 hover:border-black/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <UserCheck className={`w-4 h-4 ${selectedRole === 'CUSTOMER' ? 'text-[#68705A]' : 'text-black/40'}`} />
                  {selectedRole === 'CUSTOMER' && (
                    <span className="w-1.5 h-1.5 bg-[#68705A] rounded-full" />
                  )}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#111111]">Customer</div>
                <div className="text-[11px] text-black/50 font-light mt-0.5">Book local services</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('TECHNICIAN')}
                className={`p-4 border text-left transition-all ${
                  selectedRole === 'TECHNICIAN'
                    ? 'border-[#68705A] bg-[#F7F7F3] text-[#111111]'
                    : 'border-black/15 bg-transparent text-black/60 hover:border-black/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Wrench className={`w-4 h-4 ${selectedRole === 'TECHNICIAN' ? 'text-[#68705A]' : 'text-black/40'}`} />
                  {selectedRole === 'TECHNICIAN' && (
                    <span className="w-1.5 h-1.5 bg-[#68705A] rounded-full" />
                  )}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#111111]">Technician</div>
                <div className="text-[11px] text-black/50 font-light mt-0.5">Offer expert services</div>
              </button>
            </div>
          </div>

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

          {/* Phone Field */}
          <div className="space-y-1">
            <label className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-black/50">
              Phone Number
            </label>
            <div className="relative border-b border-black/20 focus-within:border-[#68705A] transition-colors py-1 flex items-center">
              <Phone className="w-4 h-4 text-black/40 mr-2" />
              <input
                type="tel"
                placeholder="1234567890"
                {...register('phone', {
                  required: 'Phone number is required',
                  minLength: {
                    value: 8,
                    message: 'Phone number must be at least 8 digits',
                  },
                })}
                className="w-full bg-transparent text-sm text-[#111111] placeholder:text-black/30 focus:outline-none py-1"
              />
            </div>
            {errors.phone && (
              <p className="text-[11px] text-red-600 font-medium pt-1">{errors.phone.message}</p>
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
                placeholder="At least 8 characters"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
                className="w-full bg-transparent text-sm text-[#111111] placeholder:text-black/30 focus:outline-none py-1"
              />
            </div>
            {errors.password && (
              <p className="text-[11px] text-red-600 font-medium pt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-1">
            <label className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-black/50">
              Confirm Password
            </label>
            <div className="relative border-b border-black/20 focus-within:border-[#68705A] transition-colors py-1 flex items-center">
              <Lock className="w-4 h-4 text-black/40 mr-2" />
              <input
                type="password"
                placeholder="Re-enter password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'Passwords do not match',
                })}
                className="w-full bg-transparent text-sm text-[#111111] placeholder:text-black/30 focus:outline-none py-1"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-[11px] text-red-600 font-medium pt-1">{errors.confirmPassword.message}</p>
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
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Register as {selectedRole === 'CUSTOMER' ? 'Customer' : 'Technician'}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="pt-6 border-t border-black/10 text-center">
          <p className="text-xs text-black/60 font-light">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#111111] underline hover:text-[#68705A] transition-colors">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

