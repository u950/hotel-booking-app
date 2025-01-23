/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Logo = () => {
  const logoStyles = css`
    width: 150px;
    height: 34px; /* Adjust the height as per the aspect ratio */
    background-image: url('https://raw.githubusercontent.com/gocomet-india/frontend-hotel-assignment/286ebfc6c07d6a38969da05b673b21be6e89eab3/book-my-hotel-logo.svg');
    background-size: contain;
    background-repeat: no-repeat;
    margin-top: 10px;

    @media (max-width: 768px) {
      width: 120px;
      height: 27px;
    }

    @media (max-width: 480px) {
      width: 100px;
      height: 23px;
    }

    /* For larger screens */
    @media (min-width: 1200px) {
      width: 180px;
      height: 41px;
    }

    /* Ensure smooth scaling */
    transition: width 0.3s, height 0.3s;
  `;

  return <div css={logoStyles}></div>;
};

export default Logo;
