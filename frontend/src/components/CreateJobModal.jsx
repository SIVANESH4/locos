import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { X, MapPin, FileText, Loader2, ArrowUpRight } from 'lucide-react';
import { jobService } from '../services/jobService';

export const CreateJobModal = ({ technician, isOpen, onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      service_address: '',
      description: '',
    },
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !technician) return null;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await jobService.createJob({
        technician: technician.id,
        service_address: data.service_address,
        description: data.description,
        latitude: 0.0,
        longitude: 0.0,
      });
      toast.success('Job request submitted successfully!');
      reset();
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail ||
        error.response?.data?.non_field_errors?.[0] ||
        'Failed to request job. Please try again.';
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-job-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in text-[#111111]"
    >
      <div className="bg-[#ECECE7] border border-black/20 max-w-lg w-full p-8 relative space-y-6">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 text-black/40 hover:text-[#111111] p-1 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#68705A]">
            New Request
          </div>
          <h2 id="create-job-modal-title" className="text-2xl font-normal tracking-[-0.05em] text-[#111111]">
            Request Service
          </h2>
          <p className="text-xs text-black/60 font-light">
            Booking specialist <span className="font-semibold text-[#111111]">{technician.email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <div className="space-y-1">
            <label htmlFor="service_address" className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-black/50">
              Service Address
            </label>
            <div className="relative border-b border-black/20 focus-within:border-[#68705A] transition-colors py-1 flex items-center">
              <MapPin className="w-4 h-4 text-black/40 mr-2" />
              <input
                id="service_address"
                type="text"
                placeholder="123 Main St, Apartment 4B"
                {...register('service_address', {
                  required: 'Service address is required',
                })}
                className="w-full bg-transparent text-sm text-[#111111] placeholder:text-black/30 focus:outline-none py-1"
              />
            </div>
            {errors.service_address && (
              <p className="text-[11px] text-red-600 font-medium pt-1">{errors.service_address.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="job_description" className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-black/50">
              Job Description
            </label>
            <div className="relative border-b border-black/20 focus-within:border-[#68705A] transition-colors py-1 flex items-start">
              <FileText className="w-4 h-4 text-black/40 mr-2 mt-2" />
              <textarea
                id="job_description"
                rows={3}
                placeholder="Describe the service required in detail..."
                {...register('description', {
                  required: 'Description is required',
                  minLength: {
                    value: 10,
                    message: 'Please provide at least 10 characters',
                  },
                })}
                className="w-full bg-transparent text-sm text-[#111111] placeholder:text-black/30 focus:outline-none py-1"
              />
            </div>
            {errors.description && (
              <p className="text-[11px] text-red-600 font-medium pt-1">{errors.description.message}</p>
            )}
          </div>

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
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Confirm Request</span>
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

export default CreateJobModal;

