import React from 'react'
import hero from '../../assets/images/hero.jpg'
import SearchForm from '../Search-bar/SearchForm'


const HeroSection = () => {

    const herostyles = {
        width: '97%',
        height: '90vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '0 20px',
        gap: '2rem',
        overflow: 'visible'
    }

    const backgroundStyles = {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        
        right: '0',
        top: '0',
        backgroundImage: `url(${hero})`,
        backgroundSize: 'cover',
        zIndex: -1,
    }

    const overlaystyles = {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        right: '0',
        top: '0',
        backgroundColor: 'rgba(255, 255, 255,0.85)',
        zIndex: -1,
    }

    const contentWrapper = {
        marginTop: '0.5rem',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.3rem'
    }

    const textstyles = {
        fontSize: '3.5rem',
        textShadow: '2px 2px 5px rgba(0,0,0,0.4)',
        marginBottom: '0.2rem'
    }

    const para = {
        display: 'block',
        fontSize: '1.3rem',
    }

    const searchContaier = {
        width: '90%',
        marginTop: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1000
    }

    const mobilestyle ={
        '@media (max-width:768px)' :{
            height: '40vh',
        },
    }

  return (
    <section style={{...herostyles, ...mobilestyle}}>
        <div style={backgroundStyles}></div>
        <div style={overlaystyles}></div>
        
        <div style={contentWrapper}>
            <p style={textstyles}>Find the Perfect deal, always.</p>
            <p style={para}>Book Hotels at your dream destination with BOOK MY HOTEL<br/>
            Stay once, carry memories forever
            Start here.. New Living
            See life from a different perspective
            your next space <br/>
            The perfect place for getaways! </p>
        </div>
        
        <div style={searchContaier}>
            <SearchForm/>
        </div>
    
    </section>
  )
}

export default HeroSection
