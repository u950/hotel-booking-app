import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Image from "../../pages/Hotel-Details/image";
import "../Button/Button.css";

const BookingModal = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { bookingDetails } = location.state || {};
  const [finalData, setFinalData] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [people, setPeople] = useState([{ name: "" }]);

  useEffect(() => {
    if (bookingDetails) {
      setFinalData(bookingDetails);
    }
  }, [bookingDetails]);

  const handlePersonChange = (index, name) => {
    const updatedPeople = [...people];
    updatedPeople[index].name = name;
    setPeople(updatedPeople);
  };

  const handleAddPerson = () => {
    setPeople([...people, { name: "" }]);
  };

  const handleClearAll = () => {
    setPeople([{ name: "" }]);
    setCheckIn("");
    setCheckOut("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Input validation
    if (!checkIn || !checkOut) {
      alert("Please select both Check-In and Check-Out dates.");
      return;
    }
    if (new Date(checkIn) >= new Date(checkOut)) {
      alert("Check-Out date must be later than Check-In date.");
      return;
    }
    const validPeople = people.filter((person) => person.name?.trim());
    if (validPeople.length === 0) {
      alert("Please enter at least one person's name.");
      return;
    }

    alert(
      `Booking Done for:\n- Check-In: ${checkIn}\n- Check-Out: ${checkOut}\n- People: ${validPeople
        .map((p) => p.name)
        .join(", ")}\nNavigating to home page in few seconds.`
    );

    setTimeout(() => {
      navigate(`/hotel-booking-app`,{replace : true});
    }, 500);
  };

  return (
    <div style={cardStyle}>
      {/* Image Section */}
      {finalData && finalData.image_urls?.length > 0 ? (
        <Image name={finalData.name} image_Url={finalData.image_urls} />
      ) : (
        <p>No image available</p>
      )}

      {/* Content Section */}
      <div style={contentStyle}>
        {/* Amenities */}
        <div style={{ display: "flex", gap: "50px" }}>
          <div style={amenitiesStyle}>
            <h3 style={{ marginBottom: "10px", color: "#333" }}>Amenities</h3>
            <p >{finalData.amenities?.join(", ")}</p>
          </div>

          {/* Date Selection */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <label>
              <select
                style={formSelect}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              >
                <option value="" disabled>
                  📅 Check-In Date
                </option>
                {generateDateOptions().map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <select
                style={formSelect}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              >
                <option value="" disabled>
                  📅 Check-Out Date
                </option>
                {generateDateOptions().map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Booking Form */}
        <form style={formStyle} onSubmit={handleSubmit}>
          {/* People Input */}
          {people.map((person, index) => (
            <input
              key={index}
              type="text"
              style={inputStyle}
              placeholder={`Name of person ${index + 1}`}
              value={person.name}
              onChange={(e) => handlePersonChange(index, e.target.value)}
            />
          ))}

          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
            <button
              className="button-style"
              type="button"
              onClick={handleClearAll}
            >
              Clear All
            </button>
            <button
              className="button-style"
              type="button"
              onClick={handleAddPerson}
            >
              + Add Person
            </button>
          </div>

          {/* Submit Button */}
          <button type="submit" className="button-style">
            Book Room
          </button>
        </form>
      </div>
    </div>
  );
};

/**
 * Generates an array of date options for the next 30 days.
 * @returns {string[]} Array of formatted date strings (YYYY-MM-DD)
 */
const generateDateOptions = () => {
  const today = new Date();
  const options = [];

  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    options.push(date.toISOString().split("T")[0]);
  }

  return options;
};

// Styling
const cardStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "30px",
  maxWidth: "900px",
  margin: "50px auto",
  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
  backgroundColor: "#f9f9f9",
};


const contentStyle = {
  flex: "1 1 50%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginTop: "20px",
  cursor:'pointer'
};

const amenitiesStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const formSelect = {
  padding: "12px",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  background: "#fff",
  width: "100%",
  textAlign: "center",
};

const inputStyle = {
  padding: "12px",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  width: "94.5%",
};


export default BookingModal;
