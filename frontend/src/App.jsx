import './App.css'

import { Routes, Route } from "react-router-dom";
import JoinDRRT from './pages/JoinDRRT'
import JoinDRRTForm from './pages/JoinDRRTForm'
import JoinDRRTFormStatus from './pages/JoinDRRTFormStatus';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/join" element={<JoinDRRT/>}/>
      <Route path="/join-form" element={<JoinDRRTForm/>}/>
      <Route path="/join-form/:id" element={<JoinDRRTFormStatus/>}/>
    </Routes>
  )
}

export default App
