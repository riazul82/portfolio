import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Navbar from './components/Navbar';
import Projects from './pages/Projects';
// import Watch from './pages/Watch';
import Error404 from './pages/Error404';

import './App.scss';
import Videos from './pages/Videos';
import About from './pages/About';
import Login from './auth/Login';
import ProjectDetails from './pages/ProjectDetails';
import Dashboard from './admin/Dashboard';
import UploadProject from './admin/UploadProject';
import Home from './pages/Home';
import Watch from './pages/Watch';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/projects' element={<Projects/>} />
        <Route path='/projects/:id' element={<ProjectDetails />} />
        <Route path='/projects/videos' element={<Videos/>} />
        <Route path='/projects/videos/:id' element={<Watch/>} />
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