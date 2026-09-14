import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#F7F7F3]/95 backdrop-blur-xl text-[#111111]">
      <div className="mx-auto flex h-[70px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          to="/"
          className="text-[25px] font-bold tracking-[-0.07em]"
        >
          locos<span className="text-[#68705A]">.</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 text-[12px] font-medium lg:flex">
          <Link to="/technicians" className="hover:opacity-50 transition-opacity">
            Find a technician
          </Link>
          <a href="/#services" className="hover:opacity-50 transition-opacity">
            Services
          </a>
          <a href="/#how-it-works" className="hover:opacity-50 transition-opacity">
            How it works
          </a>
          <Link to="/register" className="hover:opacity-50 transition-opacity">
            For professionals
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="bg-[#111111] px-5 py-2.5 text-xs font-medium text-white transition hover:bg-[#68705A]"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-xs font-medium text-red-700 hover:opacity-70 transition-opacity"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-2 text-xs font-medium hover:opacity-70 transition-opacity"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-[#111111] px-5 py-2.5 text-xs font-medium text-white transition hover:bg-[#68705A]"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="p-2 text-[#111111] hover:text-[#68705A] focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#ECECE7] border-b border-black/10 px-6 pt-4 pb-6 space-y-4 text-[#111111]">
          <Link
            to="/technicians"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-semibold uppercase tracking-wider hover:text-[#68705A] py-1"
          >
            Find a technician
          </Link>
          <a
            href="/#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-semibold uppercase tracking-wider hover:text-[#68705A] py-1"
          >
            Services
          </a>
          <a
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-semibold uppercase tracking-wider hover:text-[#68705A] py-1"
          >
            How it works
          </a>
          <Link
            to="/register"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-semibold uppercase tracking-wider hover:text-[#68705A] py-1"
          >
            For professionals
          </Link>

          <div className="pt-4 border-t border-black/10 space-y-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-[#68705A] py-2.5"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-center text-xs font-semibold uppercase tracking-wider text-red-700 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center text-xs font-semibold uppercase tracking-wider text-[#111111] py-2 border border-black/20"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center text-xs font-semibold uppercase tracking-wider text-white bg-[#111111] hover:bg-[#68705A] py-2.5"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;


