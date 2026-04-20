import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import './styles/global.css';
import Marketplace from './pages/Marketplace';
import ItemDetail from './pages/ItemDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateListing from './pages/CreateListing';
import Dashboard from './pages/Dashboard';
import Inbox from './pages/Inbox';
import LegitPartner from './pages/LegitPartner';
import Admin from './pages/Admin';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Marketplace />} />
          <Route path="item/:id" element={<ItemDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="post" element={<CreateListing />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="legit-partner" element={<LegitPartner />} />
          <Route path="admin" element={<Admin />} />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
