import React, { useEffect, useState ,} from "react";
import { useLocation, useParams } from "react-router-dom";
import Button from "../Button/Button"; // Reusable Button component

const BookingModal = ({id, data}) => {

  // const {guest} = useContext(PeopleCount);

  const location = useLocation();
  const { bookingDetails , parentId} = location.state || {};
  // const {bookingId} = useParams();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [people, setPeople] = useState([{ name: "" }]);
  // const [data, setData] = useState([])
  // const [currentIdx, setCurrentIdx] = useState(0);
  // const [roomImages, setRoomImages] = useState([])
  const [loading, setLoading] = useState(true);

  console.log('parent id ',parentId)

  console.log(data);


  // if(loading){
  //   return <div>Loading...</div>
  // }

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

  const imgWrapperStyle = {
    position: "relative",
    flex: "1 1 40%",
    maxWidth: "400px",
  };

  const imgStyle = {
    width: "100%",
    height: "320px",
    borderRadius: "10px",
    objectFit: "cover",
    border: "2px solid #ddd",
  };

  const roomNameStyle = {
    position: "absolute",
    top: "10px",
    left: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "8px",
    fontSize: "18px",
    fontWeight: "bold",
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

  const handleAddPerson = () => {
    if (people[people.length - 1].name !== "") {
      setPeople([...people, { name: "" }]);
    }
  };

  const handlePersonChange = (index, value) => {
    const updatedPeople = [...people];
    updatedPeople[index].name = value;
    setPeople(updatedPeople);
  };




  return (
    <div style={cardStyle}>
      {/* Image Section */}
      {/* {parentId} */}
      
      <div style={imgWrapperStyle}>
        {/* <img src={roomImages[currentIdx]} alt="Room" style={imgStyle} /> */}
        {/* <div style={roomNameStyle}>{data.name}</div> */}
      </div>

      {/* Content Section */}
      <div style={contentStyle}>
        {/* Amenities Section */}
        <div style={{ display: "flex", gap: "50px" }}>
          <div style={amenitiesStyle}>
            <h3 style={{ marginBottom: "10px", color: "#333" }}>Amenities</h3>
            {/* {data.amenities.map((amenity, index) => (
              <p key={index} style={{ margin: "5px 0", color: "#555" }}>
                - {amenity}
              </p>
            ))} */}
          </div>
          <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: "20px" }}>
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

            {/* Check-Out Dropdown */}
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
          </div>
        </div>

        {/* Booking Form */}
        <form style={formStyle}>
          {/* Input fields for people */}
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

          {/* Add More People Button */}
          <Button
            buttonName="+ Add Person"
            onClick={(e) => {
              e.preventDefault();
              handleAddPerson();
            }}
          />

          {/* Booking Button */}
          <Button buttonName="Book" />
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

export default BookingModal;
