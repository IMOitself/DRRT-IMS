import ProtectedRoute from './components/ProtectedRoute';
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from 'react';

import TestPages from './pages/TEST-PAGES';
import TestExcuse from './pages/TEST-EXCUSE';

import JoinDRRT from './pages/JoinDRRT';
import JoinDRRTForm from './pages/JoinDRRTForm';
import JoinDRRTFormStatus from './pages/JoinDRRTFormStatus';
import Home from './pages/Home';

import Login from './pages/Login';
import Register from './pages/Register';
import PasswordForgot from './pages/PasswordForgot';

import OfficerMembers from './pages/officer/Members';
import OfficerDashboard from './pages/officer/Dashboard';
import OfficerEvents from './pages/officer/Events';
import OfficerEventAttendance from './pages/officer/EventAttendance';
import OfficerIncidents from './pages/officer/Incidents';
import OfficerIncidentDetails from './pages/officer/IncidentDetails';
import OfficerCreateEvent from './pages/officer/CreateEvent';

import MemberDashboard from './pages/member/Dashboard';
import MemberAttendance from './pages/member/Attendance';
import MemberID from './pages/member/ID';

import AdviserDashboard from './pages/adviser/Dashboard';
import AdviserVault from './pages/adviser/Vault';
import AdviserBylaws from './pages/adviser/Bylaws';
import AdviserReports from './pages/adviser/Reports';
import AdviserApprovals from './pages/adviser/Approvals';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/test-pages" element={<TestPages />} />
      <Route path="/test-excuse" element={<TestExcuse />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<PasswordForgot />} />
      <Route path="/join" element={<JoinDRRT />} />
      <Route path="/join-form" element={<JoinDRRTForm />} />
      <Route path="/join-form/:id" element={<JoinDRRTFormStatus />} />

      <Route path="/adviser/dashboard" element={<AdviserDashboard />} />
      <Route path="/adviser/vault" element={<AdviserVault />} />
      <Route path="/adviser/bylaws" element={<AdviserBylaws />} />
      <Route path="/adviser/reports" element={<AdviserReports />} />
      <Route path="/adviser/approvals" element={<AdviserApprovals />} />

      <Route element={<ProtectedRoute allowedRoles={['officer']} />}>
        <Route path="/officer/dashboard" element={<OfficerDashboard />} />
        <Route path="/officer/events" element={<OfficerEvents />} />
        <Route path="/officer/events/:id" element={<OfficerEventAttendance />} />
        <Route path="/officer/members" element={<OfficerMembers />} />
        <Route path="/officer/incidents" element={<OfficerIncidents />} />
        <Route path="/officer/incidents/:id" element={<OfficerIncidentDetails />} />
        <Route path="/officer/create-event" element={<OfficerCreateEvent />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/member/dashboard" element={<MemberDashboard />} />
        <Route path="/member/attendance" element={<MemberAttendance />} />
        <Route path="/member/id" element={<MemberID />} />
      </Route>
    </Routes>
  );
}

export default App;
