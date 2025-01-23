import React, { useState } from 'react';

const ClosableCard = ({ hotel, onClose }) => {
  const [persons, setPersons] = useState([{ name: '' }]); // State for persons

  const handleAddPerson = () => {
    setPersons([...persons, { name: '' }]); // Add a new person field
  };

  const handleRemovePerson = (index) => {
    const newPersons = persons.filter((_, i) => i !== index);
    setPersons(newPersons); // Remove the person field at the specified index
  };

  const handleChange = (index, event) => {
    const newPersons = [...persons];
    newPersons[index].name = event.target.value; // Update the name of the person
    setPersons(newPersons);
  };

  const handleBooking = () => {
    // Handle booking logic here
    console.log('Booking for:', persons);
    // You can add your booking API call here
  };

  return (
    <div style={cardStyle}>
      <button onClick={onClose} style={closeButtonStyle}>X</button>
      {/* <img src={hotel.image_url} alt={hotel.name} style={imageStyle} /> */}
      <h3>{hotel.name}</h3>
      <h4>Add Persons</h4>
      {persons.map((person, index) => (
        <div key={index} style={personFieldStyle}>
          <input
            type="text"
            value={person.name}
            onChange={(event) => handleChange(index, event)}
            placeholder={`Person ${index + 1} Name`}
          />
          <button onClick={() => handleRemovePerson(index)} style={removeButtonStyle}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddPerson} style={addButtonStyle}>Add Person</button>
      <button onClick={handleBooking} style={bookingButtonStyle}>Book Now</button>
    </div>
  );
};

// Styles for the card
const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '15px',
  margin: '10px',
  position: 'relative',
  backgroundColor: '#fff',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
};

const imageStyle = {
  width: '100%',
  borderRadius: '8px',
};

const personFieldStyle = {
  display: 'flex',
  alignItems: 'center',
  margin: '10px 0',
};

const removeButtonStyle = {
  marginLeft: '10px',
  backgroundColor: '#ff4d4d',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const addButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  margin: '10px 0',
};

const bookingButtonStyle = {
  backgroundColor: '#007BFF',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default ClosableCard;