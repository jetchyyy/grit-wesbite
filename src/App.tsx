import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import DashboardHome from './pages/admin/DashboardHome';
import ManageHero from './pages/admin/ManageHero';
import ManageClasses from './pages/admin/ManageClasses';
import ManageCoaches from './pages/admin/ManageCoaches';
import ManageFeatures from './pages/admin/ManageFeatures';
import ManagePricing from './pages/admin/ManagePricing';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManageMembers from './pages/admin/ManageMembers';
import MediaLibrary from './pages/admin/MediaLibrary';
import PrivateRoute from './components/admin/PrivateRoute';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Admin Login */}
      <Route path="/admin/login" element={<Login />} />
      
      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="hero" element={<ManageHero />} />
        <Route path="classes" element={<ManageClasses />} />
        <Route path="coaches" element={<ManageCoaches />} />
        <Route path="features" element={<ManageFeatures />} />
        <Route path="pricing" element={<ManagePricing />} />
        <Route path="testimonials" element={<ManageTestimonials />} />
        <Route path="members" element={<ManageMembers />} />
        <Route path="media" element={<MediaLibrary />} />
      </Route>
    </Routes>
  );
}

export default App;