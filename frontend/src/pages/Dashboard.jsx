import { useAuth } from '../context/AuthContext';
import CustomerDashboard from './CustomerDashboard';
import TechnicianDashboard from './TechnicianDashboard';

export const Dashboard = () => {
  const { user } = useAuth();

  if (user?.role === 'CUSTOMER') {
    return <CustomerDashboard />;
  }

  if (user?.role === 'TECHNICIAN') {
    return <TechnicianDashboard />;
  }

  return <CustomerDashboard />;
};

export default Dashboard;
