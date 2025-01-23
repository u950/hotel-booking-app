import React, { useState, useEffect } from 'react';
import HeroSection from '../../components/Hero-Section/Hero-Section';
import { fetchHotelList } from '../../services/apiFetch';
import HotelCard from '../../components/Hotel-Card/HotelCard';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const [selectedPriceRanges, setSelectedPriceRanges] = useState(['below1000']);
  const [selectedCity, setSelectedCity] = useState('');
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [pages, setPages] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const {place} = location.state || {};
  const [searchTerm, setSearchTerm] = useState(place);

  useEffect(() => {
    setSearchTerm(place);
  },[place])

  const fetchHotelData = async () => {
    setLoading(true);
    try {
      const data = await fetchHotelList(pages, pageSize);
      setHotels(data.hotels);
      console.log(data.hotels);
    } catch (e) {
      console.log('Error fetching hotels:', e);
      setError('Failed to load hotels. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filterHotels = () => {
    const selectedRangesSet = new Set(selectedPriceRanges);

    const filtered = hotels.filter((hotel) => {
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

      // Check if the hotel is in the selected city
      const cityMatch = selectedCity === '' || hotel.city === selectedCity;

      return priceMatch && cityMatch;
    });

    setFilteredHotels(filtered);
    console.log(filtered);
  };

  useEffect(() => {
    fetchHotelData();
  }, [pages, pageSize]);

  useEffect(() => {
    filterHotels();
  }, [hotels, selectedPriceRanges, selectedCity]);

  const grids = {
    padding: '25px',
    display: 'flex',
    minHeight: '100vh',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'relative',
  };
  const gridStyle = { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
    gap: '20px',
    padding: '20px',
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
  };

  const filterStyle = {
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: '80px',
    width: '25%',
    height: 'fit-content',
    textAlign: 'left',
    marginLeft: '10px',
    padding: '15px',
    backgroundColor: 'white',
  };

  const handlePriceRangeChange = (event) => {
    const { value } = event.target;
    setSelectedPriceRanges([value]); // Set the selected range to the clicked one
    setPages(1)
  };

  const handleCityChange = (event) => {
    const { value } = event.target;
    setSelectedCity(value); // Set the selected city directly
  };

  return (
    <div>
      <HeroSection />

      <br />
      <div style={grids}>
        <div>
          <h3 style={filterStyle} className='filters'>Filter</h3>

          <h4>Price Range</h4>
          <label>
            <input 
              type="checkbox" 
              value="below1000"
              checked={selectedPriceRanges.includes("below1000")}
              onChange={handlePriceRangeChange}
            />
            <p>Below 1000 Rs</p>
          </label>
          <label>
            <input 
              type="checkbox" 
              value="1000-2000"
              checked={selectedPriceRanges.includes("1000-2000")}
              onChange={handlePriceRangeChange}
            />
            <p>1000 - 2000 Rs</p>
          </label>
          <label>
            <input 
              type="checkbox" 
              value="2000-4000"
              checked={selectedPriceRanges.includes("2000-4000")}
              onChange={handlePriceRangeChange}
            />
            <p>2000 - 4000 Rs</p>
          </label>
          <label>
            <input 
              type="checkbox" 
              value="4000-6000"
              checked={selectedPriceRanges.includes("4000-6000")}
              onChange={handlePriceRangeChange}
            />
            <p>4000 - 6000 Rs</p>
          </label>
          <label>
            <input 
              type="checkbox" 
              value="6000-above"
              checked={selectedPriceRanges.includes("6000-above")}
              onChange={handlePriceRangeChange}
            />
            <p>6000 and Above</p>
          </label>

          <h4>City</h4>
          <label>
            <input 
              type="checkbox" 
              value="Delhi" 
              checked={selectedCity === "Delhi"} 
              onChange={handleCityChange} 
            />
            <p>Delhi</p>
          </label>
          <label>
            <input 
              type="checkbox" 
              value="Hyderabad" 
              checked={selectedCity === "Hyderabad"} 
              onChange={handleCityChange} 
            />
            <p>Hyderabad</p>
          </label>
          <label>
            <input 
              type="checkbox" 
              value="Goa" 
              checked={selectedCity === "Goa"} 
              onChange={handleCityChange} 
            />
            <p>Goa</p>
          </label>
          <label>
            <input 
              type="checkbox" 
              value="Mumbai" 
              checked={selectedCity === "Mumbai"} 
              onChange={handleCityChange} 
            />
            <p>Mumbai</p>
          </label>
        </div>
              {/* search term for filtering  */}
        <div style={ExploreStyle} className='explore'>
          <h1>Explore Hotels </h1> 

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
            <p>No hotels found within the selected price range.</p>
          )}

          <div>
            <button onClick={() => setPages(pages - 1)} disabled={pages === 1}>Previous</button>
            <button onClick={() => setPages(pages + 1)}>Next</button>
          </div>

          <div>
            <label>
              Page Size:
              <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={36}>36</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
