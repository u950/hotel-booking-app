import React, { useState, useEffect } from 'react';
import HeroSection from '../../components/Hero-Section/Hero-Section';
import { fetchHotelList } from '../../services/apiFetch';
import HotelCard from '../../components/Hotel-Card/HotelCard';
import { useLocation } from 'react-router-dom';
import { priceRanges,cityValues, ratingValues } from './FilterValues';
import '../../components/Button/Button.css'

const Home = () => {
  // useStates for 3 filtering categories
  const location = useLocation();
  const {place} = location.state || {};

  const [selectedPriceRanges, setSelectedPriceRanges] = useState(["1000-2000"]);
  const [selectedCity, setSelectedCity] = useState(place || 'Delhi');
  const [selectedRating, setSelectedRating] = useState([]);

  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [pages, setPages] = useState(1);
  const [pageSize, setPageSize] = useState(36);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  

  const [searchTerm, setSearchTerm] = useState(place);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);



  useEffect(() => {
    // setSearchTerm(selectedCity);
    // // setPageSize(36);
    fetchHotelData();
  },[selectedCity])

  const fetchHotelData = async () => {
    setLoading(true);
    try {
      const data = await fetchHotelList(pages, pageSize);
      setHotels(data.hotels);
      // console.log(data.hotels);
    } catch (e) {
      console.log('Error fetching hotels:', e);
      setError('Failed to load hotels. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filterHotels = () => {
    const selectedRangesSet = new Set(selectedPriceRanges);
    const selectedRatingSet = new Set(selectedRating);

    const filtered = hotels.filter((hotel) => {
      // Check if the hotel is in the selected city
      const cityMatch = hotel.city === selectedCity;

      // Check if at least one room matches the selected price ranges
      const priceMatch = hotel.rooms.some((room) => {
        return (
          (selectedRangesSet.has("below1000") && room.price <= 1000) ||
          (selectedRangesSet.has("1000-2000") && room.price > 1000 && room.price <= 2000) ||
          (selectedRangesSet.has("2000-4000") && room.price > 2000 && room.price <= 4000) ||
          (selectedRangesSet.has("4000-6000") && room.price > 4000 && room.price <= 6000) ||
          (selectedRangesSet.has("6000-above") && room.price > 6000)
        );        
      });

      const ratingMatch = (selectedRatingSet.has("0-1") && hotel.rating >= 0 && hotel.rating <= 1) ||
        (selectedRatingSet.has("1-2") && hotel.rating >= 1 && hotel.rating <= 2) ||
        (selectedRatingSet.has("2-3") && hotel.rating >= 2 && hotel.rating <= 3) ||
        (selectedRatingSet.has("3-4") && hotel.rating >= 3 && hotel.rating <= 4) ||
        (selectedRatingSet.has("4-5") && hotel.rating >= 4 && hotel.rating <= 5);

      return cityMatch && (ratingMatch || priceMatch);
    });

    setFilteredHotels(filtered);
  };

  useEffect(()=>{
    if(place){
      setSelectedCity(place);
      console.log(place);
    }
  },[place])

  useEffect(() => {
    fetchHotelData();
  }, [pages, pageSize]);

  useEffect(() => {
    filterHotels();
  }, [hotels, selectedPriceRanges, selectedCity, selectedRating]);

  useEffect(() => {
    // Event listener to detect screen width changes
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const grids = {
    padding: '25px',
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100vh',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'relative',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10px',
    },
  };
  const gridStyle = { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
    gap: '20px',
    padding: '20px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      padding: '10px',
    },
  }
  const ExploreStyle = {
    display: 'grid',
    flexDirection: 'column',
    width: '70%',
    minHeight: '100%',
    textAlign: 'center',
    alignItems: 'center',
    marginRight: '10%',
    gap: '20px',
    '@media (max-width: 768px)': {
      width: '100%',
    },
  };

  const filterButtonStyle = {
    display: isMobileView ? 'block' : 'none',
    margin: '10px',
    padding: '10px',
  };

  const handlePriceRangeChange = (event) => {
    const { value } = event.target;
    setSelectedPriceRanges([value]); // Set the selected range to the clicked one
    setSelectedRating([]); // Clear the selected rating when price range is selected
    setPages(1);
  };

  const handleCityChange = (event) => {
    const { value } = event.target;
    setSelectedCity(value); // Set the selected city directly
    window.scrollBy({
      top: -230,
      left:0,
      behavior:'smooth'
    })
  };

  // handling rating change
  const handleRatingChange = (event) => {
    const { value } = event.target;
    setSelectedRating([value]); // Set the selected rating to the clicked one
    setSelectedPriceRanges([]); // Clear the selected price range when rating is selected
    setPages(1);
    window.scrollBy({
      top:-400,
      left:0,
      behavior:'smooth'
    })
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Style for the filter section to show by default on desktop
  const filterStyle = {
    display: isMobileView ? (isFilterOpen ? 'block' : 'none') : 'flex', // Show filters by default on desktop
    flexDirection: 'column',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    width: '10%', // Full width for mobile
    maxWidth: '400px', // Max width for desktop
    margin: isMobileView ? '0 auto' : '0', // Center on mobile
  };

  return (
    <div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {/* <Navbar /> */}
        <HeroSection />
      </div>
      <br />
        <div >
        <button
          className="button-style"
          style={filterButtonStyle}
          onClick={toggleFilter}
          disabled={!isMobileView}
        >
          {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Mobile Filter Pop-up */}
      {isMobileView && isFilterOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Backdrop
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={toggleFilter} // Close modal on clicking backdrop
        >
          <div
            style={{
              backgroundColor: 'white',
              width: '90%',
              maxWidth: '400px',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()} // Prevent modal close on card click
          >
            {/* Close Button for Mobile Filters */}
            <button
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
              }}
              onClick={toggleFilter}
            >
              &times; {/* Close icon */}
            </button>

            <h3 className="filters">Filters</h3>

            {/* Price Filter */}
            <h4 style={{ marginTop: '10px' }}>Price Range</h4>
            {priceRanges.map((key, i) => (
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }} key={i}>
                <input
                  type="checkbox"
                  value={key.value}
                  checked={selectedPriceRanges.includes(key.value)}
                  onChange={handlePriceRangeChange}
                />
                <p style={{ marginLeft: '5px' }}>{key.type}</p>
              </label>
            ))}

            {/* City Filter */}
            <h4>City</h4>
            {cityValues.map((key, idx) => (
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }} key={idx}>
                <input
                  type="checkbox"
                  value={key.value}
                  checked={selectedCity === key.value}
                  onChange={handleCityChange}
                />
                <p style={{ marginLeft: '5px' }}>{key.type}</p>
              </label>
            ))}

            {/* Rating Filter */}
            <h4>Rating</h4>
            {ratingValues.map((key, i) => (
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }} key={i}>
                <input
                  type="checkbox"
                  value={key.value}
                  checked={selectedRating.includes(key.value)}
                  onChange={handleRatingChange}
                />
                <p style={{ marginLeft: '5px' }}>{key.type}</p>
              </label>
            ))}
          </div>
        </div>
      )}

      <div style={grids}>
        <div style={filterStyle}>
          {/* Filter Section (if needed for desktop) */}
          <h3 className="filters">Filters</h3>
          {/* Price, City, Rating Filters */}
          <h4 style={{ marginTop: '10px' }}>Price Range</h4>
          {priceRanges.map((key, i) => (
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }} key={i}>
              <input
                type="checkbox"
                value={key.value}
                checked={selectedPriceRanges.includes(key.value)}
                onChange={handlePriceRangeChange}
              />
              <p style={{ marginLeft: '5px' }}>{key.type}</p>
            </label>
          ))}
          <h4>City</h4>
          {cityValues.map((key, idx) => (
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }} key={idx}>
              <input
                type="checkbox"
                value={key.value}
                checked={selectedCity === key.value}
                onChange={handleCityChange}
              />
              <p style={{ marginLeft: '5px' }}>{key.type}</p>
            </label>
          ))}
          <h4>Rating</h4>
          {ratingValues.map((key, i) => (
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }} key={i}>
              <input
                type="checkbox"
                value={key.value}
                checked={selectedRating.includes(key.value)}
                onChange={handleRatingChange}
              />
              <p style={{ marginLeft: '5px' }}>{key.type}</p>
            </label>
          ))}
        </div>

        <div style={ExploreStyle} >
          <h1>Explore Hotels</h1>
          {loading ? (
            <p>Loading hotels...</p>
          ) : error ? (
            <p>{error}</p>
          ) : filteredHotels.length > 0 ? (
            <div style={gridStyle}>

              {filteredHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  id={hotel.id}
                  name={hotel.name}
                  rooms={hotel.rooms}
                  rating={hotel.rating}
                  city={hotel.city}
                  imageUrl={hotel.image_url}
                  showPrice={true}
                  buttonName="View"
                />
              ))}
            </div>
          ) : (
            <p style={{color: 'red'}}>No hotels found within the selected price range.</p>
          )}

          <div>
            <button onClick={() => setPages(pages - 1)} disabled={pages === 1}>Previous</button>
            <button onClick={() => setPages(pages + 1)}>Next</button>
          </div>

          <div>
            <label style={{display:'flex', alignItems: 'center', padding:'20px'}}>
              Page Size:
              <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={36}>36</option>
              </select>
            </label >
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;