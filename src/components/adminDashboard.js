import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import BASE_URL from './config';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-top: 6px
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  background-color: #f4f6f9;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: 250px;  /* Adjust based on your sidebar width */
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Space between cards */
  padding: 20px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #e0f7fa, #b9fbc0); /* Gradient background */
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Stronger shadow */
  width: calc(33% - 20px); /* Adjust width to fit 3 cards per row */
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3); /* Enhanced shadow on hover */
  }
`;

const StatTitle = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
`;

const StatValue = styled.p`
  font-size: 40px;
  font-weight: bold;
  color: #007bff;
  margin: 0;
`;

const HomeDashboard = () => {
  const [data, setData] = useState({
    total_santri: 0,
    total_belum: 0,
    total_lunas: 0,
    total_pending: 0,
    total_tolak: 0,
    total_pendaftar: 0,
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/homeData`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <>
    <Navbar />
    <Sidebar />
      <Wrapper>
        <MainContent>
          <ContentArea>
            <DashboardContainer>
              <StatCard>
                <StatTitle>Total Santri</StatTitle>
                <StatValue>{data.total_santri}</StatValue>
              </StatCard>
              <StatCard>
                <StatTitle>Total Pendaftar</StatTitle>
                <StatValue>{data.total_pendaftar}</StatValue>
              </StatCard>
              <StatCard>
                <StatTitle>Total Belum Bayar</StatTitle>
                <StatValue>{data.total_belum}</StatValue>
              </StatCard>
              <StatCard>
                <StatTitle>Total Lunas</StatTitle>
                <StatValue>{data.total_lunas}</StatValue>
              </StatCard>
              <StatCard>
                <StatTitle>Total Pending</StatTitle>
                <StatValue>{data.total_pending}</StatValue>
              </StatCard>
              <StatCard>
                <StatTitle>Total Ditolak</StatTitle>
                <StatValue>{data.total_tolak}</StatValue>
              </StatCard>
            </DashboardContainer>
          </ContentArea>
        </MainContent>
      </Wrapper>
    <Footer />
    </>
  );
};

export default HomeDashboard;
