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

export default ClosableCard;