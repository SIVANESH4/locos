import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { X, Star, MessageSquare, Loader2, ArrowUpRight } from 'lucide-react';
import { reviewService } from '../services/reviewService';

export const ReviewModal = ({ job, isOpen, onClose, onSuccess }) => {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comment: '',
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

  if (!isOpen || !job) return null;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await reviewService.createReview({
        jobId: job.id,
        rating: rating,
        comment: data.comment,
      });
      toast.success('Review submitted successfully!');
      reset();
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail ||
        error.response?.data?.non_field_errors?.[0] ||
        error.response?.data?.job?.[0] ||
        'Failed to submit review. Please try again.';
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs text-[#111111]"
    >
      <div className="bg-[#ECECE7] border border-black/20 max-w-lg w-full p-8 relative space-y-6">
        <button
          onClick={onClose}
          aria-label="Close review modal"
          className="absolute top-6 right-6 text-black/40 hover:text-[#111111] p-1 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#68705A]">
            Client Feedback
          </div>
          <h2 id="review-modal-title" className="text-2xl font-normal tracking-[-0.05em] text-[#111111]">
            Submit Review
          </h2>
          <p className="text-xs text-black/60 font-light">
            Share feedback for Job <span className="font-mono text-[#111111]">#{job.id}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <div className="space-y-2">
            <label className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-black/50">
              Score (1 to 5 Stars)
            </label>
            <div className="flex items-center space-x-2 pt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 focus:outline-none transition-transform hover:scale-105"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= (hoveredRating || rating)
                        ? 'text-[#68705A] fill-[#68705A]'
                        : 'text-black/20'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-semibold text-[#111111] ml-2">
                {hoveredRating || rating} / 5
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="review_comment" className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-black/50">
              Comments
            </label>
            <div className="relative border-b border-black/20 focus-within:border-[#68705A] transition-colors py-1 flex items-start">
              <MessageSquare className="w-4 h-4 text-black/40 mr-2 mt-2" />
              <textarea
                id="review_comment"
                rows={3}
                placeholder="How was the service performed by the technician?"
                {...register('comment', {
                  required: 'Comment is required',
                  minLength: {
                    value: 5,
                    message: 'Comment must be at least 5 characters',
                  },
                })}
                className="w-full bg-transparent text-sm text-[#111111] placeholder:text-black/30 focus:outline-none py-1"
              />
            </div>
            {errors.comment && (
              <p className="text-[11px] text-red-600 font-medium pt-1">{errors.comment.message}</p>
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
                  <span>Submit Review</span>
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

export default ReviewModal;

