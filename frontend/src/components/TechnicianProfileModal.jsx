import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { X, Wrench, Briefcase, MapPin, FileText, Loader2, ArrowUpRight } from 'lucide-react';
import { technicianService } from '../services/technicianService';

export const TechnicianProfileModal = ({ profile, isOpen, onClose, onSuccess }) => {
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: profile?.category || '',
      experience: profile?.experience || 1,
      bio: profile?.bio || '',
      address: profile?.address || '',
      latitude: profile?.latitude || 0.0,
      longitude: profile?.longitude || 0.0,
    },
  });

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await technicianService.getCategories();
        setCategories(data);
      } catch {
        setCategories([]);
      }
    };
    if (isOpen) {
      fetchCats();
    }
  }, [isOpen]);

  useEffect(() => {
    if (profile) {
      reset({
        category: profile.category || '',
        experience: profile.experience || 1,
        bio: profile.bio || '',
        address: profile.address || '',
        latitude: profile.latitude || 0.0,
        longitude: profile.longitude || 0.0,
      });
    }
  }, [profile, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (profile && profile.id) {
        await technicianService.updateProfile(profile.id, data);
        toast.success('Technician profile updated successfully!');
      } else {
        await technicianService.createProfile(data);
        toast.success('Technician profile created successfully!');
      }
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail ||
        error.response?.data?.non_field_errors?.[0] ||
        'Failed to save technician profile. Please check your inputs.';
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs text-[#111111]">
      <div className="bg-[#ECECE7] border border-black/20 max-w-lg w-full p-8 relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-black/40 hover:text-[#111111] p-1 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#68705A]">
            Specialist Settings
          </div>
          <h2 className="text-2xl font-normal tracking-[-0.05em] text-[#111111]">
            {profile?.id ? 'Edit Profile' : 'Setup Profile'}
          </h2>
          <p className="text-xs text-black/60 font-light">
            Fill in your skills, category, and location so customers can find and request your services.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {/* Category Dropdown */}
          <div className="space-y-1">
            <label className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-black/50">
              Service Category
            </label>
            <div className="relative border-b border-black/20 focus-within:border-[#68705A] transition-colors py-1 flex items-center">
              <Wrench className="w-4 h-4 text-black/40 mr-2" />
              <select
                {...register('category', { required: 'Please select a category' })}
                className="w-full bg-transparent text-sm text-[#111111] focus:outline-none py-1"
              >
                <option value="">Select Category...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.category && (
              <p className="text-[11px] text-red-600 font-medium pt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Experience (Years) */}
          <div className="space-y-1">
            <label className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-black/50">
              Years of Experience
            </label>
            <div className="relative border-b border-black/20 focus-within:border-[#68705A] transition-colors py-1 flex items-center">
              <Briefcase className="w-4 h-4 text-black/40 mr-2" />
              <input
                type="number"
                min="0"
                max="50"
                placeholder="e.g. 5"
                {...register('experience', {
                  required: 'Experience is required',
                  min: { value: 0, message: 'Experience cannot be negative' },
                })}
                className="w-full bg-transparent text-sm text-[#111111] placeholder:text-black/30 focus:outline-none py-1"
              />
            </div>
            {errors.experience && (
              <p className="text-[11px] text-red-600 font-medium pt-1">{errors.experience.message}</p>
            )}
          </div>

          {/* Location / Address */}
          <div className="space-y-1">
            <label className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-black/50">
              Primary Location Address
            </label>
            <div className="relative border-b border-black/20 focus-within:border-[#68705A] transition-colors py-1 flex items-center">
              <MapPin className="w-4 h-4 text-black/40 mr-2" />
              <input
                type="text"
                placeholder="City, Area, or Service Address"
                {...register('address', {
                  required: 'Address is required',
                })}
                className="w-full bg-transparent text-sm text-[#111111] placeholder:text-black/30 focus:outline-none py-1"
              />
            </div>
            {errors.address && (
              <p className="text-[11px] text-red-600 font-medium pt-1">{errors.address.message}</p>
            )}
          </div>

          {/* Bio Area */}
          <div className="space-y-1">
            <label className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-black/50">
              Biography & Summary
            </label>
            <div className="relative border-b border-black/20 focus-within:border-[#68705A] transition-colors py-1 flex items-start">
              <FileText className="w-4 h-4 text-black/40 mr-2 mt-2" />
              <textarea
                rows={3}
                placeholder="Describe your expertise, services offered, and work quality..."
                {...register('bio', {
                  required: 'Bio is required',
                  minLength: {
                    value: 10,
                    message: 'Bio must be at least 10 characters',
                  },
                })}
                className="w-full bg-transparent text-sm text-[#111111] placeholder:text-black/30 focus:outline-none py-1"
              />
            </div>
            {errors.bio && (
              <p className="text-[11px] text-red-600 font-medium pt-1">{errors.bio.message}</p>
            )}
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-black/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-black/70 hover:text-[#111111] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#111111] hover:bg-[#68705A] text-white font-medium text-xs uppercase tracking-wider transition-colors flex items-center space-x-2 disabled:opacity-50 group"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span>Save Profile</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TechnicianProfileModal;

