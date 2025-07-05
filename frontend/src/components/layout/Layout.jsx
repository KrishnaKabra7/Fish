import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import '../styles/components.css';

/**
 * Main application layout wrapper.
 * [cite_start]Combines Header, main content, and Footer. [cite: 83, 84, 85, 86, 87, 88, 89]
 * @param {node} children - The page content to render between the Header and Footer.
 */
const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;