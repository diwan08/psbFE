import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import BASE_URL from './config';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: 250px;
  background-color: #f4f6f9;
`;

const SearchBar = styled.input`
  padding: 10px;
  margin-top: 30px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border: 1px solid #ddd;
  cursor: pointer;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const AddButton = styled.button`
  padding: 10px 15px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #218838;
  }
`;

const SantriList = () => {
  const [santri, setSantri] = useState([]);
  const [page, setPage] = useState(1);
  const [limit,] = useState(25);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('asc');
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate(); // Initialize useNavigate

  const fetchSantri = useCallback(async (page, limit, search, order) => {
    try {
      const response = await axios.get(`${BASE_URL}/infosantri`, {
        params: {
          page,
          limit,
          search,
          order,
        },
      });
      console.log("Fetched data:", response.data);
      if (response.data.success) {
        setSantri(response.data.santri);
        setTotalPages(Math.ceil(response.data.totalCount / limit));
      } else {
        console.error("Error fetching data:", response.data.message);
      }
    } catch (error) {
      console.error("There was an error fetching the santri data!", error);
      alert(error)
    }
  }, []);

  useEffect(() => {
    fetchSantri();
  }, [fetchSantri]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handleSortToggle = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleAddSantri = () => {
    navigate('/add-santri'); // Navigate to the add santri page
  };

  return (
    <>
    <Sidebar />
    <Navbar />
    <Wrapper>
      <MainContent>
        <AddButton onClick={handleAddSantri}>Add Santri</AddButton>
        <SearchBar
          type="text"
          placeholder="Search by NIK"
          value={search}
          onChange={handleSearchChange}
        />
        <Table>
          <thead>
            <tr>
              <TableHeader onClick={handleSortToggle}>NIK {order === 'asc' ? '↑' : '↓'}</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Tanggal Lahir</TableHeader>
              <TableHeader>Jenis Kelamin</TableHeader>
              <TableHeader>Asal Sekolah</TableHeader>
              <TableHeader>Jenis Pendaftaran</TableHeader>
              <TableHeader>Pendaftaran</TableHeader>
              <TableHeader>Nama Wali</TableHeader>
            </tr>
          </thead>
          <tbody>
            {santri.length ? (
              santri.map((item) => (
                <TableRow key={item.id}>
                  <TableData>{item.nik}</TableData>
                  <TableData>{item.name}</TableData>
                  <TableData>{new Date(item.tanggal_lahir).toLocaleDateString()}</TableData>
                  <TableData>{item.jenis_kelamin}</TableData>
                  <TableData>{item.asal_sekolah}</TableData>
                  <TableData>{item.jenis_pendaftaran}</TableData>
                  <TableData>{item.mendaftar_ke_lembaga}</TableData>
                  <TableData>{item.nama_wali}</TableData>
                </TableRow>
              ))
            ) : (
              <tr>
                <TableData colSpan="8">No data available</TableData>
              </tr>
            )}
          </tbody>
        </Table>
        <Pagination>
          <PaginationButton onClick={handlePrevPage} disabled={page === 1}>
            Previous
          </PaginationButton>
          <span>
            Page {page} of {totalPages}
          </span>
          <PaginationButton onClick={handleNextPage} disabled={page === totalPages}>
            Next
          </PaginationButton>
        </Pagination>
      </MainContent>
    </Wrapper>
    <Footer />
    </>
  );
};

export default SantriList;
