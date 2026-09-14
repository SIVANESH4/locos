import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, Briefcase, ArrowLeft, Loader2, ArrowUpRight } from 'lucide-react';
import { technicianService } from '../services/technicianService';
import CreateJobModal from '../components/CreateJobModal';
import { useAuth } from '../context/AuthContext';

export const TechnicianDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, isCustomer } = useAuth();
  const [technician, setTechnician] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await technicianService.getTechnicianProfile(id);
        setTechnician(data);
      } catch {
        setTechnician(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[80vh] bg-[#F7F7F3] flex flex-col items-center justify-center space-y-3 text-[#111111]">
        <Loader2 className="w-8 h-8 text-[#68705A] animate-spin" />
        <p className="text-xs font-medium uppercase tracking-wider text-black/40">Loading specialist profile...</p>
      </div>
    );
  }

  if (!technician) {
    return (
      <div className="min-h-[80vh] bg-[#F7F7F3] flex items-center justify-center px-4 py-16 text-[#111111]">
        <div className="max-w-md w-full bg-[#ECECE7] border border-black/10 p-10 text-center space-y-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#68705A]">
            Not Found
          </div>
          <h2 className="text-3xl font-normal tracking-tight text-[#111111]">Technician Unavailable</h2>
          <p className="text-xs text-black/50 font-light">The profile you are looking for does not exist or has been removed.</p>
          <Link
            to="/technicians"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#111111] hover:bg-[#68705A] text-white font-medium text-xs uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F3] text-[#111111] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          to="/technicians"
          className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-black/50 hover:text-[#68705A] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </Link>

        {/* Main Profile Header */}
        <div className="bg-[#ECECE7] border border-black/10 p-8 md:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-black/10 pb-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#68705A]">
                  Category #{technician.category}
                </span>
                <div className="flex items-center space-x-1 text-xs font-semibold text-[#111111]">
                  <Star className="w-4 h-4 fill-[#68705A] text-[#68705A]" />
                  <span>
                    {technician.average_rating ? technician.average_rating.toFixed(1) : 'New'}
                  </span>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-normal tracking-[-0.05em] text-[#111111]">
                {technician.email ? technician.email.split('@')[0] : `Technician #${technician.id}`}
              </h1>
              <p className="text-xs text-black/40 font-mono">{technician.email}</p>
            </div>

            {/* Action Button */}
            {isAuthenticated && isCustomer ? (
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="px-6 py-3.5 bg-[#111111] hover:bg-[#68705A] text-white font-medium text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 group self-start"
              >
                <span>Request Service</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            ) : (
              <Link
                to="/login"
                className="px-6 py-3.5 bg-[#111111] hover:bg-[#68705A] text-white font-medium text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 self-start"
              >
                <span>Log In to Request</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Bio & Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
            <div className="md:col-span-2 space-y-4">
              <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/40">
                Biography & Experience
              </div>
              <p className="text-sm text-black/80 leading-relaxed font-light bg-[#F7F7F3] p-6 border border-black/10">
                {technician.bio || 'No detailed biography provided for this technician.'}
              </p>
            </div>

            <div className="space-y-4 bg-[#F7F7F3] p-6 border border-black/10 h-fit">
              <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/40">
                Contact Summary
              </div>
              <div className="space-y-3.5 text-xs text-black/70 font-light">
                {technician.phone && (
                  <div className="flex items-center space-x-2.5">
                    <Phone className="w-4 h-4 text-black/40" />
                    <span>{technician.phone}</span>
                  </div>
                )}
                {technician.email && (
                  <div className="flex items-center space-x-2.5 truncate">
                    <Mail className="w-4 h-4 text-black/40 flex-shrink-0" />
                    <span className="truncate">{technician.email}</span>
                  </div>
                )}
                {technician.address && (
                  <div className="flex items-start space-x-2.5">
                    <MapPin className="w-4 h-4 text-black/40 flex-shrink-0 mt-0.5" />
                    <span>{technician.address}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2.5">
                  <Briefcase className="w-4 h-4 text-black/40" />
                  <span>{technician.experience ? `${technician.experience} years experience` : 'Experience unspecified'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <CreateJobModal
        technician={technician}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};

export default TechnicianDetail;

