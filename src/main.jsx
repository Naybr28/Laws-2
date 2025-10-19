import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// Pages
import App from './App.jsx'
import Ask from './process/Ask.jsx'
import Student from "./process/Student.jsx"; // Age Selection
import StudentUnder12 from "./process/StudentUnder12.jsx";
import StudentSpecific from "./process/StudentSpecific.jsx";
import HomeUI from "./process/HomeUI.jsx";
import Student14Under18 from "./process/Student14Under18.jsx";
import Login from "./process/login.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />    {/* Home */}
        <Route path="/ask" element={<Ask />} /> {/* Next page */}
        <Route path="/Student" element={<Student />} />
        <Route path="/studentUnder12" element={<StudentUnder12 />} />
        <Route path="/StudentSpecific" element={<StudentSpecific />} />
        <Route path="/HomeUI" element={<HomeUI />} />
        <Route path="/student14Under18" element={<Student14Under18 />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
