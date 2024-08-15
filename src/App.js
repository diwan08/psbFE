import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/adminLogin';
import AdminDashboard from './components/adminDashboard';
import SantriList from './components/SantriList';
import AddSantri from './components/AddSantri';
import SantriDetail from './components/SantriDetail';
import UpdateSantri from './components/UpdateSantri';
import TokenForm from './components/TokenForm';
// import Home from './components/Home';
// import SantriTable from './components/santri'; // Import komponen tabel

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/home' element={<Home/>} /> */}
        <Route path="/detail/:id" element={<SantriDetail />} />
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/datapendaftaransantri" element={<SantriList />} />
        <Route path="/add-santri" element={<AddSantri />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/token-form" element={<TokenForm />} />
        <Route path="/update-santri/:id" element={<UpdateSantri />} />
      </Routes> 
    </Router>
  );
}

export default App;
