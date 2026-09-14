import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import {
  MapPin,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  Play,
  CheckCheck,
  Edit,
  Loader2,
  AlertCircle,
  RefreshCw,
  ArrowUpRight,
} from 'lucide-react';
import { jobService } from '../services/jobService';
import { technicianService } from '../services/technicianService';
import TechnicianProfileModal from '../components/TechnicianProfileModal';
import { useAuth } from '../context/AuthContext';

export const TechnicianDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('ALL');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchProfileAndJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const techList = await technicianService.getTechnicians();
      const myProfile = techList.find((t) => t.email === user?.email);
      if (myProfile) {
        setProfile(myProfile);
      } else {
        setProfile(null);
      }

      const jobsData = await jobService.getJobs();
      setJobs(jobsData);
    } catch {
      setError('Failed to load technician dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfileAndJobs();
  }, [fetchProfileAndJobs]);

  const handleUpdateStatus = async (jobId, newStatus) => {
    setActionLoadingId(jobId);
    try {
      await jobService.updateJobStatus(jobId, newStatus);
      toast.success(`Job status updated to ${newStatus.replace('_', ' ')}!`);
      fetchProfileAndJobs();
    } catch (error) {
      const errorMsg = error.response?.data?.detail || 'Failed to update job status.';
      toast.error(errorMsg);
    } finally {
      setActionLoadingId(null);
    }
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
        <div className="space-y-6 border-b border-black/10 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#68705A]">
                Technician Workspace
              </div>
              <h1 className="text-4xl md:text-5xl font-normal tracking-[-0.05em] text-[#111111]">
                Service dashboard.
              </h1>
              <p className="text-xs text-black/50 font-mono">
                {user?.email}
              </p>
            </div>

            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="px-6 py-3 bg-[#111111] hover:bg-[#68705A] text-white font-medium text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 group self-start md:self-auto"
            >
              <Edit className="w-4 h-4" />
              <span>{profile ? 'Edit Profile' : 'Setup Profile'}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {profile ? (
            <div className="bg-[#ECECE7] border border-black/10 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-black/70">
              <div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/40 block mb-1">Trade Category</span>
                <span className="font-semibold text-[#111111]">Category #{profile.category}</span>
              </div>
              <div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/40 block mb-1">Experience</span>
                <span className="font-semibold text-[#111111]">{profile.experience} Years</span>
              </div>
              <div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/40 block mb-1">Average Rating</span>
                <div className="flex items-center space-x-1 text-[#68705A] font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#68705A]" />
                  <span>{profile.average_rating ? profile.average_rating.toFixed(1) : 'New'}</span>
                </div>
              </div>
              <div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/40 block mb-1">Location Address</span>
                <span className="font-light text-[#111111] truncate block">{profile.address || 'Not specified'}</span>
              </div>
            </div>
          ) : (
            <div className="bg-[#ECECE7] border border-black/15 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-xs font-light text-black/70">Setup your profile so customers can find your services in the marketplace list.</span>
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="text-xs font-semibold uppercase tracking-wider text-[#68705A] underline hover:text-[#111111]"
              >
                Create Profile Now
              </button>
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-3 border-b border-black/10 scrollbar-none">
          {['ALL', 'PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'REJECTED'].map((tab) => (
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
              onClick={fetchProfileAndJobs}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-[#111111] text-white font-medium text-xs uppercase tracking-wider hover:bg-[#68705A] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Job Feed */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-3">
            <Loader2 className="w-8 h-8 text-[#68705A] animate-spin" />
            <p className="text-xs font-medium uppercase tracking-wider text-black/40">Fetching assigned jobs...</p>
          </div>
        ) : filteredJobs.length === 0 && !error ? (
          <div className="bg-[#ECECE7] border border-black/10 p-16 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-black/30 mx-auto" />
            <h3 className="text-lg font-normal text-[#111111]">No jobs assigned</h3>
            <p className="text-xs text-black/50 font-light max-w-sm mx-auto">
              You don't have any jobs matching this status filter right now.
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
                      <span className="text-[9px] uppercase tracking-wider text-black/40">Customer ID:</span>
                      <span className="font-mono text-[#111111]">{job.customer}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-4 md:pt-0 border-t md:border-t-0 border-black/10">
                  {job.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(job.id, 'ACCEPTED')}
                        disabled={actionLoadingId === job.id}
                        className="flex items-center space-x-1.5 px-4 py-2.5 bg-[#111111] hover:bg-[#68705A] text-white text-[10px] font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(job.id, 'REJECTED')}
                        disabled={actionLoadingId === job.id}
                        className="flex items-center space-x-1.5 px-4 py-2.5 border border-red-300 text-red-700 hover:bg-red-50 text-[10px] font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </>
                  )}

                  {job.status === 'ACCEPTED' && (
                    <button
                      onClick={() => handleUpdateStatus(job.id, 'IN_PROGRESS')}
                      disabled={actionLoadingId === job.id}
                      className="flex items-center space-x-1.5 px-5 py-2.5 bg-[#111111] hover:bg-[#68705A] text-white text-[10px] font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Start Job</span>
                    </button>
                  )}

                  {job.status === 'IN_PROGRESS' && (
                    <button
                      onClick={() => handleUpdateStatus(job.id, 'COMPLETED')}
                      disabled={actionLoadingId === job.id}
                      className="flex items-center space-x-1.5 px-5 py-2.5 bg-[#111111] hover:bg-[#68705A] text-white text-[10px] font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Complete Job</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Technician Profile Modal */}
        <TechnicianProfileModal
          profile={profile}
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          onSuccess={fetchProfileAndJobs}
        />
      </div>
    </div>
  );
};

export default TechnicianDashboard;

