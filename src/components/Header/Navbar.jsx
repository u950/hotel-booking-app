/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/images/logo';

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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const navContainer = css`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
`;

const navLinks = css`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const navItem = css`
  color: black;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

const logoStyles = css`
  padding: 1px;
  cursor: pointer;
`;

const menuIcon = css`
  display: none;

  @media (max-width: 768px) {
    display: block;
    font-size: 24px;
    cursor: pointer;
    color: black;
  }
`;

const mobileMenu = css`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background: white;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 999;

  @media (min-width: 769px) {
    display: none;
  }
`;

const signInButton = css`
  padding: 8px 20px;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Get the current path

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Common links
  const links = [
    { to: '/hotel-booking-app', label: 'Home' },
    { to: '/hotel', label: 'Hotel' },
    { to: '/hotel-booking-app', label: 'Places' },
  ];

  return (
    <>
      <nav css={navStyles}>
        <div css={navContainer}>
          <div css={logoStyles}>
            <Logo />
          </div>
          <div css={navLinks}>
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                css={navItem}
                style={{
                  fontWeight: location.pathname === link.to ? 'bold' : '500',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link to="/" css={signInButton}>
            Sign In
          </Link>
          <div
            css={menuIcon}
            onClick={toggleMenu}
            role="button"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div css={mobileMenu}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              css={navItem}
              onClick={toggleMenu}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/" css={navItem} onClick={toggleMenu}>
            Sign In
          </Link>
        </div>
      )}
      <div css={css`padding-top: 60px;`} />
    </>
  );
};

export default Navbar;
