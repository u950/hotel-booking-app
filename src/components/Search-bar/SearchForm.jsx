import React, { useEffect, useState } from 'react';
import './SearchForm.css';
import { fetchHotels } from '../../services/apiFetch';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const [place, setPlace] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guest, setGuest] = useState("");

  // suggestion box
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const [clickSearchButton,setClickSearchButton] = useState(false);

  const navigate = useNavigate();

  // function to fetch suggestion
  const fetchSuggestions = async (searchTerm) => {
    if (searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const data = await fetchHotels();
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
    } catch (e) {
      console.log('Error fetching suggestions...', e);
    }
  };

  // add debounce effect for api calls
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchSuggestions(place);
    }, 300);
    return () => clearTimeout(timeout);
  }, [place]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!place) {
      alert("Please fill in all fields.");
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Check-Out date should be later than Check-In date");
      return;
    }
    // Navigate to Home with the current city as place
    navigate(`/`, { state: { place } });
    window.scrollBy({
      top : 600, // distance to scroll
      left : 0,
      behavior: 'smooth',
    })
  };

  const handleSuggestionClick = (suggestion) => {
    
    setPlace(suggestion.city); // Update input field with the selected suggestion
    setShowSuggestions(false); // Hide suggestions after selection
    console.log('clicked on city suggestion')
  };

  return (
    <div className="form-container">
      <form onSubmit={handleOnSubmit} className="search-form">
        {/* Location input field */}
        <div className="search-input-container">
          <input
            value={place}
            placeholder='📍 Type city, place or hotel name  🔎'
            className="search-input"
            onChange={(e) => {
              setPlace(e.target.value); // Show suggestions on input change
            }}
            onFocus={() => setShowSuggestions(true)} // Show suggestions on focus
            onBlur={() => setTimeout(() => setShowSuggestions(false), 1000)} // Delay to prevent blur from hiding suggestions too quickly
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className='suggestions-dropdown'>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)} // Update input on suggestion click
                  className='suggestion-item'
                >
                  <span className='hotel-name'>{suggestion.name}🏠</span>
                  <span className='hotel-city'>{suggestion.city}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Check-In dropdown */}
        <select
          className='form-select'
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        >
          <option value="" disabled> 📅 Check-In Date</option>
          {generateDateOptions().map((date) => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>

        {/* Check-Out dropdown */}
        <select
          className="form-select"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        >
          <option value="" disabled> 📅 Check-Out Date</option>
          {generateDateOptions().map((date) => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>

        {/* Guest input */}
        <div className="guest-container">
          <input
            type="number"
            min='1'
            max='6'
            value={guest}
            onChange={(e) => setGuest(e.target.value)}
            className='guest-input'
            placeholder='👥 Guests'
          />
        </div>

        <button type="submit" className="search-button"
          onClick={()=>{
            setClickSearchButton(true)
            setTimeout(()=>setClickSearchButton(false), 500)}}
        >Search</button>
        {clickSearchButton && <p style={{color: 'blue'}}>searching...</p>}
      </form>
    </div>
  );
};

// Function to generate date options for the calendar
const generateDateOptions = () => {
  const today = new Date();
  const start = today;
  const options = [];

  // Available for 1 month calendar only
  for (let i = 0; i < 30; i++) {
    const date = new Date(start); // Date function for current date
    date.setDate(date.getDate() + i);
    options.push(date.toISOString().split("T")[0]);
  }

  return options;
};

export default SearchForm;
