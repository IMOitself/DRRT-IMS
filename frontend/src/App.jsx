import './App.css'

import { Routes, Route } from "react-router-dom";
import JoinDRRT from './pages/JoinDRRT'
import JoinDRRTForm from './pages/JoinDRRTForm'

function App() {
  return (
    <Routes>
      <Route path="/" element={<JoinDRRT/>}/> {/* temporarily */}
      <Route path="/join" element={<JoinDRRT/>}/>
      <Route path="/join-form" element={<JoinDRRTForm/>}/>
    </Routes>
  )
}

export default App
