import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="#" className="brand-link">
        <span className="brand-text font-weight-light">Admin PSB</span>
      </Link>

      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="https://via.placeholder.com/160x160"
              className="img-circle elevation-2"
              alt="User"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">Admin</a>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <Link to="/admin/dashboard" className="nav-link">
                <i className="nav-icon fas fa-home" />
                <p>Home</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/datapendaftaransantri" className="nav-link">
                <i className="nav-icon fas fa-users" />
                <p>Data Santri</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/pendaftaran" className="nav-link">
                <i className="nav-icon fas fa-edit" />
                <p>Pendaftaran</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
