import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';

// pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Videos from './pages/Videos';
import Watch from './pages/Watch';
import Error404 from './pages/Error404';

// auth
import Login from './pages/auth/Login';

// admin
import Dashboard from './pages/admin/Dashboard';
import UploadProject from './pages/admin/UploadProject';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About />} />
        <Route path='/projects' element={<Projects/>} />
        <Route path='/projects/:id' element={<ProjectDetails />} />
        <Route path='/projects/videos' element={<Videos/>} />
        <Route path='/projects/videos/:id' element={<Watch/>} />
        <Route path='/admin/login' element={<Login />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/project/upload' element={<UploadProject />} />
        <Route path='*' element={<Error404/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;