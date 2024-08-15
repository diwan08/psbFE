import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import BASE_URL from './config';

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
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
  text-align: center;
`;

const Info = styled.p`
  font-size: 1.1rem;
  margin: 0.5rem 0;
`;

const Label = styled.span`
  font-weight: bold;
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

const SantriDetail = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [santri, setSantri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSantriDetail = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`${BASE_URL}/detail/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSantri(response.data.d);
      } catch (error) {
        console.error("Kesalahan saat mengambil detail santri:", error);
        setError("Terjadi kesalahan saat mengambil detail santri. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchSantriDetail();
  }, [id]);

  if (loading) {
    return <Alert className="alert-info">Memuat...</Alert>;
  }

  if (error) {
    return <Alert className="alert-danger">{error}</Alert>;
  }

  return (
    <>
      <Navbar />
      <ContentWrapper>
        <Sidebar />
        <MainContent>
          <Container>
            <Title>Detail Santri</Title>
            {santri && (
              <>
                <Info><Label>ID:</Label> {santri.id}</Info>
                <Info><Label>Nama:</Label> {santri.name}</Info>
                <Info><Label>Tempat Lahir:</Label> {santri.tempat_lahir}</Info>
                <Info><Label>Tanggal Lahir:</Label> {new Date(santri.tanggal_lahir).toLocaleDateString()}</Info>
                <Info><Label>Jenis Kelamin:</Label> {santri.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</Info>
                <Info><Label>Asal Sekolah:</Label> {santri.asal_sekolah}</Info>
                <Info><Label>Jenis Pendaftaran:</Label> {santri.jenis_pendaftaran}</Info>
                <Info><Label>Mendaftar ke Lembaga:</Label> {santri.mendaftar_ke_lembaga}</Info>
                <Info><Label>Nama Wali:</Label> {santri.nama_wali}</Info>
              </>
            )}
          </Container>
        </MainContent>
      </ContentWrapper>
      <Footer />
    </>
  );
};

export default SantriDetail;
