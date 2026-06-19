import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import ReferralDetail from './components/pages/ReferralDetail';
import NotFound from './components/pages/NotFound';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/referral/:id" element={<ReferralDetail />} />
        </Route>

        {/* Optional Redirection Route */}
        <Route path="/dashboard/referrals" element={<Navigate to="/" replace />} />

        {/* Fallback Public Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
