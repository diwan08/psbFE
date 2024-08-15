import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from './config';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
  max-width: 1200px;
  width: 100%;
`;

const Button = styled.button`
  background-color: #00b300;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-top: 1.5rem;
  font-size: 1rem;

  &:hover {
    background-color: #009900;
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TableHead = styled.thead`
  background-color: #007bff;
  color: white;
`;

const TableHeader = styled.th`
  padding: 0.75rem;
  text-align: center;
  font-weight: bold;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableData = styled.td`
  padding: 0.75rem;
  text-align: center;
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

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatGender = (genderCode) => {
  switch (genderCode) {
    case 'L':
      return 'Laki-laki';
    case 'P':
      return 'Perempuan';
    default:
      return 'Tidak Diketahui';
  }
};

const SantriList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [santri, setSantri] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSantri = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`${BASE_URL}/infosantri`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSantri(response.data.santri);
      } catch (error) {
        console.error("Kesalahan saat mengambil data santri:", error);
        setError("Terjadi kesalahan saat mengambil data santri. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchSantri();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddSantri = () => {
    navigate('/add-santri');
  };

  const handleNIKClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/update-santri/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus santri ini?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${BASE_URL}/santri/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSantri(santri.filter((s) => s.id !== id));
      } catch (error) {
        console.error("Kesalahan saat menghapus data santri:", error);
        setError("Terjadi kesalahan saat menghapus data santri. Silakan coba lagi nanti.");
      }
    }
  };

  const filteredSantri = santri.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.nik.includes(searchQuery) ||
    s.asal_sekolah.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.nama_wali.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <ContentWrapper>
        <Sidebar />
        <MainContent>
          <Container>
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
            {!loading && !error && (
              <div>
                <h3>Daftar Santri</h3>
                <Input
                  type="text"
                  placeholder="Cari santri..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <Button onClick={handleAddSantri}>Tambah Santri</Button>
                <Table>
                  <TableHead>
                    <tr>
                      <TableHeader>NIK</TableHeader>
                      <TableHeader>Nama</TableHeader>
                      <TableHeader>Tanggal Lahir</TableHeader>
                      <TableHeader>Jenis Kelamin</TableHeader>
                      <TableHeader>Asal Sekolah</TableHeader>
                      <TableHeader>Jenis Pendaftaran</TableHeader>
                      <TableHeader>Daftar ke Lembaga</TableHeader>
                      <TableHeader>Nama Wali</TableHeader>
                      <TableHeader>Aksi</TableHeader>
                    </tr>
                  </TableHead>
                  <TableBody>
                    {filteredSantri.map((s) => (
                      <TableRow key={s.id}>
                        <TableData>
                          <span
                            style={{ color: '#007bff', cursor: 'pointer' }}
                            onClick={() => handleNIKClick(s.id)}
                          >
                            {s.nik}
                          </span>
                        </TableData>
                        <TableData>{s.name}</TableData>
                        <TableData>{formatDate(s.tanggal_lahir)}</TableData>
                        <TableData>{formatGender(s.jenis_kelamin)}</TableData>
                        <TableData>{s.asal_sekolah}</TableData>
                        <TableData>{s.jenis_pendaftaran}</TableData>
                        <TableData>{s.mendaftar_ke_lembaga}</TableData>
                        <TableData>{s.nama_wali}</TableData>
                        <TableData>
                          <Button
                            style={{ backgroundColor: '#007bff', marginRight: '8px' }}
                            onClick={() => handleEdit(s.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            style={{ backgroundColor: '#ff0000' }}
                            onClick={() => handleDelete(s.id)}
                          >
                            Delete
                          </Button>
                        </TableData>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </Container>
        </MainContent>
      </ContentWrapper>
      <Footer />
    </>
  );
};

export default SantriList;
