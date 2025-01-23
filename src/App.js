import React from 'react'
import Home from './pages/Home/Home.jsx'
import { Routes, Route } from 'react-router-dom'
import HotelDetails from './pages/Hotel-Details/HotelDetails.jsx'
import BookingModal from './components/Booking-Modal/BookingModal.jsx'
import ExploreHotel from './pages/Explore-Hotel/Hotels.jsx'
import Navbar from './components/Header/Navbar.jsx'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotel" element={<ExploreHotel />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/hotel/booking/:id" element={<BookingModal />} />
      </Routes>
    </div>
  )
}

export default App
