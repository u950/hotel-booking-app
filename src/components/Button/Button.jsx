import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'
import { useNavigate } from 'react-router-dom'

const Button = ({buttonName, id,hotelName, city,rating,rooms,img,imgURL, price, bookingId , bookingDetails}) => {

  const navigate = useNavigate();   // navigation 
  

  const handleClick=()=>{
    if(id){

      navigate(`/hotel/${id}/`,{state: {img}});

    } else if(bookingId){

      navigate(`/hotel/booking/${bookingId}`,{state:{bookingDetails, img}});  // parent hotelId

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
