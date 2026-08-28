import './App.css'

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import JoinDRRT from './pages/JoinDRRT'
import JoinDRRTForm from './pages/JoinDRRTForm'
import JoinDRRTFormStatus from './pages/JoinDRRTFormStatus';
import Home from './pages/Home';
import Events from './pages/Events';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/events" element={<Events/>}/>
      <Route path="/join" element={<JoinDRRT/>}/>

      <Route path="/join-form" element={
        <ProtectedRoute>
          <JoinDRRTForm/>
        </ProtectedRoute>
      }/>
      <Route path="/join-form/:id" element={
        <ProtectedRoute>
          <JoinDRRTFormStatus/>
        </ProtectedRoute>
      }/>

      <Route path="/login" element={<Login/>}/>
      {/* <Route path="/register" element={<Register/>}/> */}
    </Routes>
  )
}

export default App
