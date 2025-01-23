import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const HotelCard = ({
  id,
  keyid,
  name,
  city,
  rooms = [],
  rating,
  imageUrl,
  ImageUrls = [],
  showPrice,
  priceSingle,
  showSinglePrice,
  bookingId,
  buttonName,
  roomDetails,
}) => {
  const navigate = useNavigate();

  const [isHovered, setHovered] = useState(false);

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: isHovered ? 
    '0 4px 15px rgba(0,0,0,0.8)'
    : '0 4px 10px rgba(0,0,0,0.2)' ,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: '#fff',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    tranform:isHovered? 'scale(1.05)' : 'scale(1)'
  };

  const imgStyle = {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '2px solid #ddd',
    transition: 'transform 0.2s ease-in-out',
    transform: isHovered? 'scale(1.05)' : 'scale(1)'
  };

  const paraStyle = {
    margin: '5px 0',
    color: '#555',
  };

  const h2Style = {
    margin: '10px 0',
    fontSize: '20px',
    color: '#333',
  };

  const h3Style = {
    marginTop: '10px',
    fontSize: '18px',
  };

  const sectionStyle = {
    display: 'flex',
    textAlign: 'left',
    justifyContent: 'space-between',
  };

  const [currentImg, setCurrentImg] = useState(0); 

  // Automatically change images at regular intervals
  useEffect(() => {
    if (ImageUrls.length > 0) {
      const interval = setInterval(() => {
        setCurrentImg((prevIndex) => (prevIndex + 1) % ImageUrls.length);
      }, 3000); // Change image every 3 seconds

      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }
  }, [ImageUrls]);

  const prices = rooms.map((room) => room.price); // Price range finding: min and max prices
  let minPrice, maxPrice;

  if (showPrice && prices.length > 0) {
    minPrice = Math.min(...prices);
    maxPrice = Math.max(...prices);
  }

  return (
    <div 
        style={cardStyle}
        onMouseEnter={()=>setHovered(true)}
        onMouseLeave={()=>setHovered(false)}    
    >
        
      {/* Single Image Display */}
      {showPrice && (
        <img src={imageUrl} alt={name} style={imgStyle} className="hotel-image" />
      )}
      {/* {showSinglePriceHome && (
        <img src={imageUrl} alt={name} style={imgStyle} className="hotel-image" />
      )} */}
      {/* Multiple Images with Automatic Slide */}
      {showSinglePrice && (
        <div>
          <img
            src={ImageUrls[currentImg]}
            alt={`Room img ${currentImg + 1}`}
            style={imgStyle}
          />
        </div>
      )}
      <div style={{ padding: '15px' }}>
        <section style={sectionStyle}>
          <h2 style={h2Style}>{name}</h2>
          {showPrice && <p style={paraStyle}>⭐{rating}</p>}
        </section>

        <p style={paraStyle}>{city}</p>

        <section style={sectionStyle}>
          {/* Conditional Rendering for Price */}
          {showPrice && <h4 style={h3Style}>₹ {minPrice} - {maxPrice}</h4>}
          {showSinglePrice && <h4 style={h3Style}>₹ {priceSingle}</h4>}

          {/* Button */}
          <Button
            buttonName={buttonName}
            id={id}
            img={imageUrl}
            rooms={rooms || undefined}
            heroImage={imageUrl || undefined}
            bookingId={bookingId || undefined}
            bookingDetails={roomDetails || undefined} // Room details array from API
            parentId={keyid || undefined}
          />
        </section>
      </div>
    </div>
  );
};

HotelCard.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  rating: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default HotelCard;
