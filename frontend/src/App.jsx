import './App.css'

import { Routes, Route } from "react-router-dom";
import JoinDRRT from './pages/JoinDRRT'
import JoinDRRTForm from './pages/JoinDRRTForm'
import JoinDRRTFormStatus from './pages/JoinDRRTFormStatus';
import Home from './pages/Home';
import Events from './pages/Events';
import Roster from './pages/officer/Roster';
import LoginRegister from './pages/LoginRegister';
import Dashboard from './pages/member/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login-register" element={<LoginRegister/>}/>
      <Route path="/events" element={<Events/>}/>
      <Route path="/join" element={<JoinDRRT/>}/>
      <Route path="/join-form" element={<JoinDRRTForm/>}/>
      <Route path="/join-form/:id" element={<JoinDRRTFormStatus/>}/>
      <Route path="/officer/roster" element={<Roster/>}/>
      <Route path="/member/dashboard" element={<Dashboard/>}/>
    </Routes>
  )
}

export default App
