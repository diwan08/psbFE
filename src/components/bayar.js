import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from './config';
import styled from 'styled-components';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

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
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const SantriList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getAllSantri`); // Sesuaikan endpoint jika diperlukan
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Terjadi kesalahan saat mengambil data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <ContentWrapper>
        <Sidebar />
        <MainContent>
          <Container>
            <h3>Daftar Santri</h3>
            {loading && <p>Memuat data...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
              <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nomor Pendaftaran</th>
                    <th>ID Santri</th>
                    <th>Nama</th>
                    <th>Tempat Lahir</th>
                    <th>Tanggal Lahir</th>
                    <th>Jenis Kelamin</th>
                    <th>Asal Sekolah</th>
                    <th>Jenis Pendaftaran</th>
                    <th>Daftar ke Lembaga</th>
                    <th>Nama Wali</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.nomer_pendaftaran}</td>
                      <td>{item.id_santri}</td>
                      <td>{item.name}</td>
                      <td>{item.tempat_lahir}</td>
                      <td>{item.tanggal_lahir}</td>
                      <td>{item.jenis_kelamin}</td>
                      <td>{item.asal_sekolah}</td>
                      <td>{item.jenis_pendaftaran}</td>
                      <td>{item.mendaftar_ke_lembaga}</td>
                      <td>{item.nama_wali}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Container>
        </MainContent>
      </ContentWrapper>
      <Footer />
    </>
  );
};

export default SantriList;
