import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import BASE_URL from './config';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
// import ContentWrapper from './ContentWrapper';


const Container = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: auto;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddSantri = () => {
  const [formData, setFormData] = useState({
    nik: '',
    name: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    asal_sekolah: '',
    jenis_pendaftaran: '',
    mendaftar_ke_lembaga: '',
    nama_wali: '',
    avatar: '', // Optional field for avatar
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/registrasi`, formData);
      if (response.data.success) {
        console.log('Response Data:', response.data); // Tambahkan log di sini
        navigate('/admin/datapendaftaransantri'); // Navigate to the santri list page
      } else {
        alert('Error adding santri');
      }
    } catch (error) {
        console.error('There was an error adding the santri!', error);
        if (error.response && error.response.data) {
          alert(`Error: ${error.response.data.message}`);
        } else {
          alert('Error: Network error or unexpected response');
        }
      }
  };

  return (
    <>
      <Sidebar/>
      <Navbar/>
        <Container>
          <h2>Data Santri</h2>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="nik"
              placeholder="NIK"
              value={formData.nik}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="tempat_lahir"
              placeholder="Tempat Lahir"
              value={formData.tempat_lahir}
              onChange={handleChange}
              required
            />
            <Input
              type="date"
              name="tanggal_lahir"
              placeholder="Tanggal Lahir"
              value={formData.tanggal_lahir}
              onChange={handleChange}
              required
            />
            <Select
              name="jenis_kelamin"
              value={formData.jenis_kelamin}
              onChange={handleChange}
              required
            >
              <option value="">Jenis Kelamin</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </Select>
            <Input
              type="text"
              name="asal_sekolah"
              placeholder="Asal Sekolah"
              value={formData.asal_sekolah}
              onChange={handleChange}
              required
            />
            <Select
              name="jenis_pendaftaran"
              value={formData.jenis_pendaftaran}
              onChange={handleChange}
              required
            >
              <option value="">Jenis Pendaftaran</option>
              <option value="santri_baru">Santri Baru</option>
              <option value="mutasi_sekolah_lain">Mutasi Sekolah Lain</option>
            </Select>
            <Select
              name="mendaftar_ke_lembaga"
              value={formData.mendaftar_ke_lembaga}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Lembaga</option>
              <option value="RA">RA</option>
              <option value="MI">MI</option>
              <option value="MTS">MTS</option>
              <option value="MA">MA</option>
              <option value="PONDOK_SAJA">Pondok</option>
            </Select>
            <Input
              type="text"
              name="nama_wali"
              placeholder="Nama Wali"
              value={formData.nama_wali}
              onChange={handleChange}
              required
            />
            {/* <Input
              type="text"
              name="avatar"
              placeholder="Avatar URL (Optional)"
              value={formData.avatar}
              onChange={handleChange}
            /> */}
            <Button type="submit">+ Tambah Santri</Button>
          </form>
        </Container>
      <Footer/>
    </>
  );
};

export default AddSantri;
