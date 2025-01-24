import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import HotelCard from '../../components/Hotel-Card/HotelCard';
import { fetchHotelDetails } from '../../services/apiFetch';

const HotelDetails = () => {
  const location = useLocation();
  const { img } = location.state || {};

  const { id } = useParams();
  const [hotelData, setHotelData] = useState([]);

  useEffect(() => {
    const getHotelDetails = async () => {
      const data = await fetchHotelDetails(id);
      if (data) {
        setHotelData(data);
      }
    };
    getHotelDetails();
  }, [id]);

  const roomData = hotelData.rooms || [];

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
    },
    hero: {
      width: '100%',
      height: '50vh',
      position: 'relative',
      backgroundImage: `url(${img})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      fontSize: '2rem',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    heroText: {
      zIndex: 2,
      padding:'10px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      padding: '20px',
      width: '70%',
      justifyContent: 'center',
      margin:'0 auto',
    },
    para : {
      display: 'block',
      fontSize: '1rem',
      padding:'20px',
  }, 
    responsive:{
      margin: '10px',
      fontSize:'1.5rem',
      textAlign:'center',
    }
  };

  const MediaQuery=`
  @media (max-width :768px ){
    .herText {
    font-size: 1.5rem;
    }
    .grid{
      grid-template-coloumn: 1fr;
      gap: 10px;
      padding: 10px;
    }
    .para{
      font-size: 0.9rem;
    }
  }
  `;

  const addGlobalStyle=()=>{
    const style = document.createElement('style');
    style.innerHTML = MediaQuery;
    document.head.appendChild(style);
  };


  addGlobalStyle();
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.overlay}></div>
        <div style={styles.heroText}>
          <h1>{hotelData.name}</h1>
          <p>📍{hotelData.city}    ⭐{hotelData.rating}</p>
        </div>
      </div>

      {/* Grid Section */}
      <div style={styles.grid}>
        {roomData.map((room, i) => (
          <HotelCard
            keyid={id}   // keyid for hotlid parent id
            ImageUrls={room.image_urls}
            name={room.name}
            price={room.price}
            buttonName="Book Now"
            showSinglePrice={true}
            priceSingle={room.price}
            bookingId={room.id}
            roomDetails={room} // passing rooms data to next booking component via button click
            
          />
        ))}
      </div>
      <h3 style={{marginLeft:'10px'}}>About the {hotelData.name}</h3>
      <p style={styles.para}>{hotelData.description}</p>
      
    </div>
  );
};

export default HotelDetails;
