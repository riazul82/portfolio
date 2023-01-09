import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Navbar from './components/Navbar';
import Projects from './pages/Projects';
// import Watch from './pages/Watch';
import Error404 from './pages/Error404';

import './App.scss';
// import Videos from './pages/Videos';
import About from './pages/About';
import Login from './auth/Login';
import ProjectDetails from './pages/ProjectDetails';
import Dashboard from './admin/Dashboard';
import UploadProject from './admin/UploadProject';
import Home from './pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/projects' element={<Projects/>} />
        {/* <Route path='/videos' element={<Videos/>} /> */}
        {/* <Route path='/videos/:title' element={<Watch/>} /> */}
        <Route path='/:title' element={<ProjectDetails />} />
        <Route path='/projects/:title' element={<ProjectDetails />} />
        <Route path='/about' element={<About />} />
        <Route path='/admin/login' element={<Login />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/project/upload' element={<UploadProject />} />
        <Route path='*' element={<Error404/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;