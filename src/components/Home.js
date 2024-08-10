// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import Sidebar from './Sidebar';
// import Navbar from './Navbar';
// import Footer from './Footer';


// const DashboardContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
// `;

// const StatCard = styled.div`
//   background: #f7f7f7;
//   border-radius: 8px;
//   padding: 20px;
//   margin: 10px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   width: 300px;
//   text-align: center;
// `;

// const StatTitle = styled.h3`
//   font-size: 18px;
//   color: #333;
// `;

// const StatValue = styled.p`
//   font-size: 24px;
//   font-weight: bold;
//   color: #007bff;
// `;

// const Home = () => {
//   const [data, setData] = useState({
//     total_santri: 0,
//     total_belum: 0,
//     total_lunas: 0,
//     total_pending: 0,
//     total_tolak: 0,
//     total_pendaftar: 0,
//   });

//   useEffect(() => {
//     // Fetch the data from the API
//     axios.get('/api/home')
//       .then(response => {
//         setData(response.data);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the data!", error);
//       });
//   }, []);

//   return (
    
    
    
//     <DashboardContainer>

//       <StatCard>
//         <StatTitle>Total Santri</StatTitle>
//         <StatValue>{data.total_santri}</StatValue>
//       </StatCard>
//       <StatCard>
//         <StatTitle>Total Pendaftar</StatTitle>
//         <StatValue>{data.total_pendaftar}</StatValue>
//       </StatCard>
//       <StatCard>
//         <StatTitle>Total Belum</StatTitle>
//         <StatValue>{data.total_belum}</StatValue>
//       </StatCard>
//       <StatCard>
//         <StatTitle>Total Lunas</StatTitle>
//         <StatValue>{data.total_lunas}</StatValue>
//       </StatCard>
//       <StatCard>
//         <StatTitle>Total Pending</StatTitle>
//         <StatValue>{data.total_pending}</StatValue>
//       </StatCard>
//       <StatCard>
//         <StatTitle>Total Tolak</StatTitle>
//         <StatValue>{data.total_tolak}</StatValue>
//       </StatCard>
//     </DashboardContainer>
//   );
// };

// export default Home;
