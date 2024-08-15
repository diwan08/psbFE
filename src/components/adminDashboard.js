import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col,  Spinner } from 'react-bootstrap';
import BASE_URL from './config';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './dashboard.css'

function Home() {
  const [data, setData] = useState({
    total_santri: 0,
    total_belum: 0,
    total_lunas: 0,
    total_pending: 0,
    total_tolak: 0,
    total_pendaftar: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/HomeData`);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Gagal memuat data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <p>{error}</p>
      </Container>
    );
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={12} md={3} lg={2}>
            <Sidebar />
          </Col>
          <Col xs={12} md={9} lg={10} className="mt-4">
            <Navbar />
            <Row className="my-4">
              <Col>
                <h2 className="text-center">Dashboard</h2>
              </Col>
            </Row>
            <Row>
            <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box">
                    <span className="info-box-icon bg-info elevation-1"><i className="fas fa-users"></i></span>
                      <div className="info-box-content">
                          <span className="info-box-text">Santri</span>
                          <span className="info-box-number">{data.total_santri}</span>
                    </div>
                  </div>
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box">
                    <span className="info-box-icon bg-info elevation-1"><i className="fas fa-users"></i></span>
                      <div className="info-box-content">
                          <span className="info-box-text">Pendaftar</span>
                          <span className="info-box-number">{data.total_pendaftar}</span>
                    </div>
                  </div>
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box">
                    <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-users"></i></span>
                      <div className="info-box-content">
                          <span className="info-box-text">Belum Lunas</span>
                          <span className="info-box-number">{data.total_belum}</span>
                    </div>
                  </div>
              </div>
            </Row>
            <Row className="mt-4">
            <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box">
                    <span className="info-box-icon bg-secondary elevation-1"><i className="fas fa-users"></i></span>
                      <div className="info-box-content">
                          <span className="info-box-text">Lunas</span>
                          <span className="info-box-number">{data.total_lunas}</span>
                    </div>
                  </div>
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box">
                    <span className="info-box-icon bg-info elevation-1"><i className="fas fa-users"></i></span>
                      <div className="info-box-content">
                          <span className="info-box-text">Pending</span>
                          <span className="info-box-number">{data.total_pending}</span>
                    </div>
                  </div>
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box">
                    <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-users"></i></span>
                      <div className="info-box-content">
                          <span className="info-box-text">Di Tolak</span>
                          <span className="info-box-number">{data.total_tolak}</span>
                    </div>
                  </div>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
