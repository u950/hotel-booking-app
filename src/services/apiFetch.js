export const fetchHotels = async ()=>{
    try{
        const response = await fetch(`https://www.gocomet.com/api/assignment/hotels-name`)
        const data = await response.json();
        return data;
    }catch(e){
        console.log('error fetching hotels data',e);
    }
}

// fetch hotelss list

export const fetchHotelList = async (pages, size)=>{
    try
    {
        const response = await fetch(`https://www.gocomet.com/api/assignment/hotels?page=${pages}&size=${size}`);
        const data = await response.json();
        return data;
    } catch(e){
        console.log('error fetching hotel lists..', e);
    }
}


// fetch individual hotel details

export const fetchHotelDetails = async (id)=>{
    try
    {
        const response = await fetch(`https://www.gocomet.com/api/assignment/hotels/${id}`)
        const data = await response.json();
        return data.hotel;
    } catch(error){
        console.log('error fetching individual hotel details .. ', error);
    }
}