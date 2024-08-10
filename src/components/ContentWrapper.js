// src/components/ContentWrapper.jsx
import React from 'react';

const ContentWrapper = ({ children }) => {
  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="container-fluid pt-3">
          {children}
        </div>
      </section>
    </div>
  );
};

export default ContentWrapper;
