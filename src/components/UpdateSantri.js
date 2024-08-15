import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from './config';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  display: flex;
  background: linear-gradient(135deg, #a8edea, #fed6e3);
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex-grow: 1;
  margin-left: 250px;
  padding: 2rem 1rem;
  padding-top: 4rem;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-top: 1.5rem;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
`;

const Alert = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0.25rem;

  &.alert-info {
    background-color: #d1ecf1;
    color: #0c5460;
  }

  &.alert-danger {
    background-color: #f8d7da;
    color: #721c24;
  }
`;

const EditSantri = () => {
  const [santri, setSantri] = useState({
    nik: '', // Tambahkan state untuk NIK
    name: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    asal_sekolah: '',
    jenis_pendaftaran: '',
    mendaftar_ke_lembaga: '',
    nama_wali: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSantri = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`${BASE_URL}/detail/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSantri(response.data.d);
      } catch (error) {
        console.error("Kesalahan saat mengambil data santri:", error);
        setError("Terjadi kesalahan saat mengambil data santri. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchSantri();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSantri({ ...santri, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem('token');
    const { id, ...santridata } = santri;


    try {
      await axios.put(`${BASE_URL}/updateSantri/${id}`, santridata, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess("Data santri berhasil diperbarui!");
      setTimeout(() => {
        navigate('/admin/datapendaftaransantri');
      }, 2000);
    } catch (error) {
      console.error("Kesalahan saat memperbarui data santri:", error);
      setError("Terjadi kesalahan saat memperbarui data santri. Silakan coba lagi nanti.", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <ContentWrapper>
        <Sidebar />
        <MainContent>
          <Container>
            <h3>Edit Santri</h3>
            {loading && (
              <Alert className="alert-info">
                Memuat...
              </Alert>
            )}
            {error && (
              <Alert className="alert-danger">
                {error}
              </Alert>
            )}
            {success && (
              <Alert className="alert-info">
                {success}
              </Alert>
            )}
            {!loading && !error && (
              <form onSubmit={handleSubmit}>
                <Label>Nama</Label>
                <Input
                  type="text"
                  name="name"
                  value={santri.name}
                  onChange={handleInputChange}
                  required
                />
                <Label>Tempat Lahir</Label>
                <Input
                  type="text"
                  name="tempat_lahir"
                  value={santri.tempat_lahir}
                  onChange={handleInputChange}
                  required
                />
                <Label>Tanggal Lahir</Label>
                <Input
                  type="date"
                  name="tanggal_lahir"
                  value={santri.tanggal_lahir}
                  onChange={handleInputChange}
                  required
                />
                <Label>Jenis Kelamin</Label>
                <Select
                  name="jenis_kelamin"
                  value={santri.jenis_kelamin}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </Select>
                <Label>Asal Sekolah</Label>
                <Input
                  type="text"
                  name="asal_sekolah"
                  value={santri.asal_sekolah}
                  onChange={handleInputChange}
                  required
                />
                <Label>Jenis Pendaftaran</Label>
                <Select
                  name="jenis_pendaftaran"
                  value={santri.jenis_pendaftaran}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Pilih Jenis Pendaftaran</option>
                  <option value="santri_baru">Baru</option>
                  <option value="mutasi_sekolah_lain">Pindahan</option>
                </Select>
                <Label>Daftar ke Lembaga</Label>
                <Select
                  name="mendaftar_ke_lembaga"
                  value={santri.mendaftar_ke_lembaga}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Pilih Lembaga</option>
                  <option value="MI">MI</option>
                  <option value="MTS">MTS</option>
                  <option value="MA">MA</option>
                  <option value="PONDOK_SAJA">Ponpes</option>
                </Select>
                <Label>Nama Wali</Label>
                <Input
                  type="text"
                  name="nama_wali"
                  value={santri.nama_wali}
                  onChange={handleInputChange}
                  required
                />
                <Button type="submit">Simpan Perubahan</Button>
              </form>
            )}
          </Container>
        </MainContent>
      </ContentWrapper>
      <Footer />
    </>
  );
};

export default EditSantri;
