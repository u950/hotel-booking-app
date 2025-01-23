/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import Logo from '../../assets/images/logo';
import { Link } from 'react-router-dom';
import Home from '../../pages/Home/Home';

// Navbar styles
const navStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  z-index: 1000;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const styles = {
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 10px',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  navItem: {
    color: 'black',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#007bff',
    },
  },
  logo: {
    padding: '1px',
    cursor: 'pointer',
  },
  menuIcon: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'block',
      fontSize: '24px',
      cursor: 'pointer',
      color: 'black',
    },
  },
  mobileMenu: {
    // position: 'fixed',
    top: '60px',
    left: 0,
    right: 0,
    background: 'white',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    display: 'none',
    zIndex: 999,
    '@media (max-width: 768px)': {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
  },
  signInButton: {
    padding: '8px 20px',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
    '@media (max-width: 768px)': {
      display: 'none',
    },
  }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav css={navStyles}>
        <div style={styles.navContainer}>
          <div style={styles.logo}>
            <Logo />
          </div>
          <div style={styles.navLinks}>
            <Link to="/" style={styles.navItem} component={Home}>Home</Link>
            <Link to="/hotel" style={styles.navItem}>Hotel</Link>
            <Link to="/places" style={styles.navItem}>Places</Link>
          </div>
          <Link to="/SignIn" css={css(styles.signInButton)}>Sign In</Link>
          <div style={styles.menuIcon} onClick={toggleMenu}>
            {isMenuOpen ? '✕' : '☰'}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div css={css(styles.mobileMenu)}>
          <Link to="/" style={styles.navItem} onClick={toggleMenu}>Home</Link>
          <Link to="/hotel" style={styles.navItem} onClick={toggleMenu}>Hotel</Link>
          <Link to="/places" style={styles.navItem} onClick={toggleMenu}>Places</Link>
          <Link to="/SignIn" style={styles.navItem} onClick={toggleMenu}>Sign In</Link>
        </div>
      )}
      {/* Add padding to body to prevent content from hiding under fixed navbar */}
      <div style={{ paddingTop: '60px' }} />
    </>
  );
};

export default Navbar;
