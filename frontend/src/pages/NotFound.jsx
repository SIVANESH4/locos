import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-6xl font-extrabold text-slate-900 tracking-tight">404</h1>
        <h2 className="text-xl font-bold text-slate-800">Page Not Found</h2>
        <p className="text-sm text-slate-600">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
