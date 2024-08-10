import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/adminLogin';
import AdminDashboard from './components/adminDashboard';
import SantriList from './components/SantriList';
import AddSantri from './components/AddSantri';
// import Home from './components/Home';
// import SantriTable from './components/santri'; // Import komponen tabel

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/home' element={<Home/>} /> */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/datapendaftaransantri" element={<SantriList />} />
        <Route path="/add-santri" element={<AddSantri />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
