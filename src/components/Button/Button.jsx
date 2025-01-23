import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'
import { useNavigate } from 'react-router-dom'
// import BookingModal from '../Booking-Modal/BookingModal'

const Button = ({buttonName, id,parentId, img, bookingId , bookingDetails}) => {

  const navigate = useNavigate();   // navigation 
  

  const handleClick=()=>{
    if(id){

      navigate(`/hotel/${id}/`,{state: {img}});

    } else if(bookingId){

      navigate(`/hotel/booking/${bookingId}`,{state:{bookingDetails,parentId}});  // parent hotelId
       
    }
  }
  return (

    <button
      className='button-style'
      onClick={handleClick}
    >{buttonName}
    </button>
  )

}

Button.propTypes={
    name: PropTypes.string.isRequired,
}

export default Button
