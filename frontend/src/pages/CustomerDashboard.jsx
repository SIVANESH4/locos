import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { MapPin, Clock, Star, Ban, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { jobService } from '../services/jobService';
import ReviewModal from '../components/ReviewModal';

export const CustomerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('ALL');

  // Review Modal state
  const [selectedJobForReview, setSelectedJobForReview] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobService.getJobs();
      setJobs(data);
    } catch {
      setJobs([]);
      setError('Failed to load your job requests. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleCancelJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to cancel this job request?')) return;
    try {
      await jobService.cancelJob(jobId);
      toast.success('Job cancelled successfully.');
      fetchJobs();
    } catch (error) {
      const errorMsg = error.response?.data?.detail || 'Failed to cancel job.';
      toast.error(errorMsg);
    }
  };

  const handleOpenReviewModal = (job) => {
    setSelectedJobForReview(job);
    setIsReviewModalOpen(true);
  };

  const filteredJobs = jobs.filter((job) => {
    if (activeTab === 'ALL') return true;
    return job.status === activeTab;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 border-b border-amber-500 pb-0.5">Pending</span>;
      case 'ACCEPTED':
        return <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-700 border-b border-blue-500 pb-0.5">Accepted</span>;
      case 'IN_PROGRESS':
        return <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-700 border-b border-indigo-500 pb-0.5">In Progress</span>;
      case 'COMPLETED':
        return <span className="text-[10px] font-semibold uppercase tracking-wider text-[#68705A] border-b border-[#68705A] pb-0.5">Completed</span>;
      case 'CANCELLED':
        return <span className="text-[10px] font-semibold uppercase tracking-wider text-black/40 border-b border-black/20 pb-0.5">Cancelled</span>;
      case 'REJECTED':
        return <span className="text-[10px] font-semibold uppercase tracking-wider text-red-700 border-b border-red-500 pb-0.5">Rejected</span>;
      default:
        return <span className="text-[10px] font-semibold uppercase tracking-wider text-black/50">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F3] text-[#111111] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-4 border-b border-black/10 pb-8">
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#68705A]">
            Customer Activity
          </div>
          <h1 className="text-4xl md:text-5xl font-normal tracking-[-0.05em] text-[#111111]">
            Your service requests.
          </h1>
          <p className="text-sm font-light text-black/60 max-w-xl">
            Track job progress, manage request statuses, and leave reviews for finished work.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-3 border-b border-black/10 scrollbar-none">
          {['ALL', 'PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'REJECTED'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-transparent text-black/60 border-black/15 hover:border-black/30'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-[#ECECE7] border border-red-300 p-6 text-red-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-xs font-medium">{error}</p>
            </div>
            <button
              onClick={fetchJobs}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-[#111111] text-white font-medium text-xs uppercase tracking-wider hover:bg-[#68705A] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Jobs List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-3">
            <Loader2 className="w-8 h-8 text-[#68705A] animate-spin" />
            <p className="text-xs font-medium uppercase tracking-wider text-black/40">Fetching service history...</p>
          </div>
        ) : filteredJobs.length === 0 && !error ? (
          <div className="bg-[#ECECE7] border border-black/10 p-16 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-black/30 mx-auto" />
            <h3 className="text-lg font-normal text-[#111111]">No requests found</h3>
            <p className="text-xs text-black/50 font-light max-w-sm mx-auto">
              There are no job requests matching your selected status filter.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-[#ECECE7] border border-black/10 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-black/25 transition-colors"
              >
                <div className="space-y-4 flex-1">
                  <div className="flex items-center space-x-4">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/40">
                      Job #{job.id}
                    </span>
                    {getStatusBadge(job.status)}
                    <span className="text-xs text-black/40 font-light flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {new Date(job.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-base font-normal tracking-tight text-[#111111] leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 text-xs text-black/60 font-light pt-1">
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#68705A]" />
                      <span>{job.service_address}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[9px] uppercase tracking-wider text-black/40">Tech ID:</span>
                      <span className="font-mono text-[#111111]">{job.technician}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-4 md:pt-0 border-t md:border-t-0 border-black/10">
                  {['PENDING', 'ACCEPTED'].includes(job.status) && (
                    <button
                      onClick={() => handleCancelJob(job.id)}
                      className="flex items-center space-x-1.5 px-4 py-2.5 border border-red-300 text-red-700 hover:bg-red-50 text-[10px] font-semibold uppercase tracking-wider transition-colors"
                    >
                      <Ban className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  )}

                  {job.status === 'COMPLETED' && (
                    <button
                      onClick={() => handleOpenReviewModal(job)}
                      className="flex items-center space-x-1.5 px-5 py-2.5 bg-[#111111] text-white hover:bg-[#68705A] text-[10px] font-semibold uppercase tracking-wider transition-colors"
                    >
                      <Star className="w-3.5 h-3.5 fill-white" />
                      <span>Leave Review</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Review Modal */}
        <ReviewModal
          job={selectedJobForReview}
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          onSuccess={fetchJobs}
        />
      </div>
    </div>
  );
};

export default CustomerDashboard;

