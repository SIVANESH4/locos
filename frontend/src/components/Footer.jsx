export const Footer = () => {
  return (
    <footer className="bg-[#ECECE7] border-t border-black/10 text-[#111111] py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xl font-bold tracking-[-0.05em] text-[#111111]">
            Locos<span className="text-[#68705A]">.</span>
          </div>

          <p className="text-xs text-black/50 font-light text-center md:text-left">
            &copy; {new Date().getFullYear()} Locos Marketplace. Connecting certified local specialists with clients.
          </p>

          <div className="flex space-x-6 text-xs font-medium uppercase tracking-wider text-black/60">
            <span>Electricians</span>
            <span>Plumbers</span>
            <span>Carpenters</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

