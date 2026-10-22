import ProtectedRoute from './components/ProtectedRoute';
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from 'react';

import JoinDRRT from './pages/JoinDRRT';
import JoinDRRTForm from './pages/JoinDRRTForm';
import JoinDRRTFormStatus from './pages/JoinDRRTFormStatus';
import Home from './pages/Home';

import Login from './pages/Login';
import Register from './pages/Register';
import PasswordForgot from './pages/PasswordForgot';
import Profile from './pages/Profile';

import OfficerMembers from './pages/officer/Members';
import OfficerDashboard from './pages/officer/Dashboard';
import OfficerEvents from './pages/officer/Events';
import OfficerEventAttendance from './pages/officer/EventAttendance';
import OfficerCreateEvent from './pages/officer/CreateEvent';
import OfficerIncidents from './pages/officer/Incidents';

import MemberDashboard from './pages/member/Dashboard';
import MemberAttendance from './pages/member/Attendance';
import MemberIncidents from './pages/member/Incidents';
import MemberCreateIncident from './pages/member/CreateIncident';

import AdviserDashboard from './pages/adviser/Dashboard';
import AdviserMembers from './pages/adviser/Members';
import AdviserApprovals from './pages/adviser/Approvals';
import AdviserIncidents from './pages/adviser/Incidents';
import AdviserEvents from './pages/adviser/Events';
import AdviserEventAttendance from './pages/adviser/EventAttendance';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<PasswordForgot />} />
      <Route path="/join" element={<JoinDRRT />} />
      <Route path="/join-form" element={<JoinDRRTForm />} />
      <Route path="/join-form/:id" element={<JoinDRRTFormStatus />} />

      <Route element={<ProtectedRoute allowedRoles={['adviser']} />}>
        <Route path="/adviser/dashboard" element={<AdviserDashboard />} />
        <Route path="/adviser/approvals" element={<AdviserApprovals />} />
        <Route path="/adviser/events" element={<AdviserEvents />} />
        <Route path="/adviser/events/:id" element={<AdviserEventAttendance />} />
        <Route path="/adviser/members" element={<AdviserMembers />} />
        <Route path="/adviser/incidents" element={<AdviserIncidents />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['officer']} />}>
        <Route path="/officer/dashboard" element={<OfficerDashboard />} />
        <Route path="/officer/events" element={<OfficerEvents />} />
        <Route path="/officer/events/:id" element={<OfficerEventAttendance />} />
        <Route path="/officer/members" element={<OfficerMembers />} />
        <Route path="/officer/create-event" element={<OfficerCreateEvent />} />
        <Route path="/officer/incidents" element={<OfficerIncidents />} />
        <Route path="/officer/create-incident" element={<MemberCreateIncident />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* officers are members too, so they can switch to the member pages */}
      <Route element={<ProtectedRoute allowedRoles={['member', 'officer']} />}>
        <Route path="/member/dashboard" element={<MemberDashboard />} />
        <Route path="/member/attendance" element={<MemberAttendance />} />
        <Route path="/member/incidents" element={<MemberIncidents />} />
        <Route path="/member/create-incident" element={<MemberCreateIncident />} />
      </Route>
    </Routes>
  );
}

export default App;
