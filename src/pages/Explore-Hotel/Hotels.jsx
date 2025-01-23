import React, { useEffect, useState } from 'react'
import HotelCard from '../../components/Hotel-Card/HotelCard';
import { fetchHotelList } from '../../services/apiFetch';

const Hotels = () => {

  const gridStyle = { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
    gap: '20px',
    padding: '20px',
  }

  const [pages, setPages] = useState(3);
  const size = 6;

  const [hotels, setHotels] = useState([]);


  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);


  const fetchHotels = async () => {

    if(!hasMore || loading) return;  // prevent fetching if already more or no hotels
    setLoading(true);   // set loading true


    try {

      const data = await fetchHotelList(pages, size);  // fetch from api services

      if(data.hotels.length === 0) setHasMore(false);   // no more hotels needed
      else setHotels((prevHotels) => [...prevHotels, ...data.hotels])  // append new hotels

    } catch (e) {
      console.error('error fetching hotel data', e);
    } finally {
      setLoading(false);
    }
  }


  // assign data to variable setHotels array


  useEffect(() => {
    const getHotels = async () => {
      const hotelData = await fetchHotels();
      if (hotelData) {
        setHotels(hotelData);
      }
    };
    getHotels();
  }, [pages]);


  // unlimited scrolling for hotels

  useEffect(() => {
    const handleScroll = () => {
      if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
      setPages((prevPage) => prevPage + 1);  // load next page
    }

    window.addEventListener('scroll', handleScroll);
    return ()=> window.removeEventListener('scroll', handleScroll);
  },[loading]);

  return (
    <div  style={gridStyle}>
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          id={hotel.id}
          name={hotel.name}
          city={hotel.city}
          rating={hotel.rating}
          rooms={hotel.rooms}
          imageUrl={hotel.image_url}
          showPrice={true}
          buttonName="view"
        />
      ))}
      {loading && <p>Loading...</p>}
    </div>
  )
}

export default Hotels
