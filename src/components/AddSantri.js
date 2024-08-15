import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from './config';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Fullscreen height */
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 800px; /* You can adjust the max-width as needed */
  padding: 2rem;
  background: linear-gradient(135deg, #f0f8ff, #e6e6e6);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #00e600;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #009900;
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
    nama_wali: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`${BASE_URL}/registrasi`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Response:', response.data);
      navigate('/admin/datapendaftaransantri');
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
      setError('Failed to add santri. Please try again.');
    }
  };

  return (
    <PageContainer>
      <ContentContainer>
        <FormContainer>
          <h2>Add New Santri</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <Input type="text" name="nik" placeholder="NIK" onChange={handleChange} required />
            <Input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <Input type="text" name="tempat_lahir" placeholder="Tempat Lahir" onChange={handleChange} required />
            <Input type="date" name="tanggal_lahir" placeholder="Tanggal Lahir" onChange={handleChange} required />
            
            <Select name="jenis_kelamin" onChange={handleChange} required>
              <option value="">Pilih Jenis Kelamin</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </Select>

            <Select name="jenis_pendaftaran" onChange={handleChange} required>
              <option value="">Pilih Jenis Pendaftaran</option>
              <option value="santri_baru">Santri Baru</option>
              <option value="mutasi_sekolah_lain">Mutasi Sekolah Lain</option>
            </Select>

            <Select name="mendaftar_ke_lembaga" onChange={handleChange} required>
              <option value="">Pilih Lembaga</option>
              <option value="RA">RA</option>
              <option value="MI">MI</option>
              <option value="MTS">MTS</option>
              <option value="MA">MA</option>
              <option value="PONDOK_SAJA">Pondok Saja</option>
            </Select>

            <Input type="text" name="asal_sekolah" placeholder="Asal Sekolah" onChange={handleChange} required />
            <Input type="text" name="nama_wali" placeholder="Nama Wali" onChange={handleChange} required />
            <Button type="submit">Add Santri</Button>
          </form>
        </FormContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default AddSantri;
