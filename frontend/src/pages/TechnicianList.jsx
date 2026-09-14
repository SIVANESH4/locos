import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Briefcase, Filter, Search, Loader2, RefreshCw, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { technicianService } from '../services/technicianService';
import CreateJobModal from '../components/CreateJobModal';
import { useAuth } from '../context/AuthContext';

export const TechnicianList = () => {
  const { isAuthenticated, isCustomer } = useAuth();
  const [technicians, setTechnicians] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMinRating, setSelectedMinRating] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal State for Booking
  const [selectedTechnicianForBooking, setSelectedTechnicianForBooking] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      const data = await technicianService.getCategories();
      setCategories(data);
    } catch {
      // Ignore initial category load errors
    }
  };

  const fetchTechnicians = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (selectedMinRating) params.min_rating = selectedMinRating;

      const data = await technicianService.getTechnicians(params);
      setTechnicians(data);
    } catch {
      setTechnicians([]);
      setError('Failed to fetch technicians. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedMinRating]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchTechnicians();
  }, [fetchTechnicians]);

  const handleOpenBookingModal = (tech) => {
    setSelectedTechnicianForBooking(tech);
    setIsBookingModalOpen(true);
  };

  const getCategoryName = (catId) => {
    const found = categories.find((c) => String(c.id) === String(catId));
    return found ? found.name : `Category #${catId}`;
  };

  return (
    <div className="min-h-screen bg-[#F7F7F3] text-[#111111] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Title Section */}
        <div className="space-y-4 border-b border-black/10 pb-8">
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#68705A]">
            Verified Marketplace
          </div>
          <h1 className="text-4xl md:text-6xl font-normal tracking-[-0.05em] text-[#111111]">
            Skilled local specialists.
          </h1>
          <p className="text-sm font-light text-black/60 max-w-xl">
            Browse verified technicians in your area. Filter by trade category or client rating.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-[#ECECE7] border border-black/10 p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Category Chips */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/40 flex items-center pr-2">
              <Filter className="w-3 h-3 mr-1 text-[#68705A]" /> Category
            </span>
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors border ${
                selectedCategory === ''
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-transparent text-black/70 border-black/15 hover:border-black/30'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(String(cat.id))}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors border whitespace-nowrap ${
                  selectedCategory === String(cat.id)
                    ? 'bg-[#68705A] text-white border-[#68705A]'
                    : 'bg-transparent text-black/70 border-black/15 hover:border-black/30'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Rating Select Filter */}
          <div className="flex items-center space-x-3 self-end md:self-auto">
            <label htmlFor="rating-filter" className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/40">
              Min Rating
            </label>
            <select
              id="rating-filter"
              value={selectedMinRating}
              onChange={(e) => setSelectedMinRating(e.target.value)}
              className="bg-transparent border-b border-black/20 text-xs font-medium text-[#111111] py-1 px-2 focus:outline-none focus:border-[#68705A]"
            >
              <option value="">All Ratings</option>
              <option value="3">3+ Stars</option>
              <option value="4">4+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
            </select>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-[#ECECE7] border border-red-300 p-6 text-red-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-xs font-medium">{error}</p>
            </div>
            <button
              onClick={fetchTechnicians}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-[#111111] text-white font-medium text-xs uppercase tracking-wider hover:bg-[#68705A] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Grid / Empty / Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-3">
            <Loader2 className="w-8 h-8 text-[#68705A] animate-spin" />
            <p className="text-xs font-medium uppercase tracking-wider text-black/40">Searching catalog...</p>
          </div>
        ) : technicians.length === 0 && !error ? (
          <div className="bg-[#ECECE7] border border-black/10 p-16 text-center space-y-4">
            <Search className="w-8 h-8 text-black/30 mx-auto" />
            <h3 className="text-lg font-normal text-[#111111] tracking-tight">No technicians matched</h3>
            <p className="text-xs text-black/50 max-w-sm mx-auto font-light">
              Try adjusting your category or rating filter to view available specialists.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicians.map((tech) => (
              <div
                key={tech.id}
                className="bg-[#ECECE7] border border-black/10 p-6 flex flex-col justify-between space-y-6 hover:border-black/25 transition-colors group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#68705A]">
                      {getCategoryName(tech.category)}
                    </span>
                    <div className="flex items-center space-x-1 text-xs font-semibold text-[#111111]">
                      <Star className="w-3.5 h-3.5 fill-[#68705A] text-[#68705A]" />
                      <span>{tech.average_rating ? tech.average_rating.toFixed(1) : 'New'}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-normal tracking-[-0.03em] text-[#111111] truncate">
                      {tech.email ? tech.email.split('@')[0] : `Technician #${tech.id}`}
                    </h3>
                    <p className="text-xs text-black/40 font-mono truncate">{tech.email}</p>
                  </div>

                  <p className="text-xs text-black/70 font-light line-clamp-3 leading-relaxed">
                    {tech.bio || 'No bio provided.'}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-black/10 text-xs text-black/60 font-light">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="w-3.5 h-3.5 text-black/40" />
                      <span>{tech.experience ? `${tech.experience} years experience` : 'Experience unspecified'}</span>
                    </div>
                    {tech.address && (
                      <div className="flex items-center space-x-2 truncate">
                        <MapPin className="w-3.5 h-3.5 text-black/40 flex-shrink-0" />
                        <span className="truncate">{tech.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/10 flex items-center space-x-3">
                  <Link
                    to={`/technicians/${tech.id}`}
                    className="flex-1 text-center py-2.5 px-3 border border-black/20 hover:border-black/50 text-[#111111] font-semibold text-[10px] uppercase tracking-wider transition-colors"
                  >
                    Profile
                  </Link>
                  {isAuthenticated && isCustomer ? (
                    <button
                      onClick={() => handleOpenBookingModal(tech)}
                      className="flex-1 py-2.5 px-3 bg-[#111111] hover:bg-[#68705A] text-white font-medium text-[10px] uppercase tracking-wider transition-colors flex items-center justify-center space-x-1"
                    >
                      <span>Request</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="flex-1 text-center py-2.5 px-3 bg-[#111111] hover:bg-[#68705A] text-white font-medium text-[10px] uppercase tracking-wider transition-colors"
                    >
                      Book
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <CreateJobModal
        technician={selectedTechnicianForBooking}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onSuccess={fetchTechnicians}
      />
    </div>
  );
};

export default TechnicianList;

