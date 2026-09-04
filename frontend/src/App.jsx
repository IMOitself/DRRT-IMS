import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from 'react';

import JoinDRRT from './pages/JoinDRRT';
import JoinDRRTForm from './pages/JoinDRRTForm';
import JoinDRRTFormStatus from './pages/JoinDRRTFormStatus';
import Home from './pages/Home';
import Events from './pages/Events';
import LoginRegister from './pages/LoginRegister';

import Roster from './pages/officer/Roster';
import OfficerDashboard from './pages/officer/Dashboard';
import OfficerAttendance from './pages/officer/Attendance';
import Incidents from './pages/officer/Incidents';
import IncidentDetails from './pages/officer/IncidentDetails';
import OfficerTraining from './pages/officer/Training';

import Dashboard from './pages/member/Dashboard';
import Attendance from './pages/member/Attendance';
import Training from './pages/member/Training';
import Announcements from './pages/member/Announcements';
import ID from './pages/member/ID';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login-register" element={<LoginRegister />} />
      <Route path="/events" element={<Events />} />
      <Route path="/join" element={<JoinDRRT />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/join-form" element={<JoinDRRTForm />} />
        <Route path="/join-form/:id" element={<JoinDRRTFormStatus />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['officer']} />}>
        <Route path="/officer/dashboard" element={<OfficerDashboard />} />
        <Route path="/officer/attendance" element={<OfficerAttendance />} />
        <Route path="/officer/roster" element={<Roster />} />
        <Route path="/officer/incidents" element={<Incidents />} />
        <Route path="/officer/incidents/:id" element={<IncidentDetails />} />
        <Route path="/officer/training" element={<OfficerTraining />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['member', 'officer']} />}>
        <Route path="/member/dashboard" element={<Dashboard />} />
        <Route path="/member/attendance" element={<Attendance />} />
        <Route path="/member/training" element={<Training />} />
        <Route path="/member/announcements" element={<Announcements />} />
        <Route path="/member/id" element={<ID />} />
      </Route>
    </Routes>
  );
}

export default App;
