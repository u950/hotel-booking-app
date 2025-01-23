import React, { useEffect, useState } from 'react'

const Image = ({image_Url, name}) => {

  const [currentImg, setCurrentImg] = useState(0);

  const imgStyle = {
    width: "100%",
    height: "320px",
    borderRadius: "10px",
    objectFit: "cover",
    border: "2px solid #ddd",
  };
  const imgWrapperStyle = {
    position: "relative",
    flex: "1 1 40%",
    maxWidth: "400px",
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

  useEffect(()=>{
    if(image_Url){
        const interval = setInterval(()=>{
        setCurrentImg((prev) => (prev +1) % image_Url.length);
        },4000)
        return ()=> clearInterval(interval);
    }
  },[image_Url])

  
  return (
    <div style={imgWrapperStyle}>
        <img src={image_Url[currentImg]} alt="Room" style={imgStyle} />
        <div style={roomNameStyle}>{name}</div>
  </div>
  )
}

export default Image
