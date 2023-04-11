import React from 'react';
import styled from "styled-components";

const StyledPlaceDetails = styled.section`
    
    .image-container img{
      height: 200px;
      object-fit: cover;
    }
`;

function PlaceDetails({place}) {
    // console.log(place.photo.images.original.url)

    return (
        <StyledPlaceDetails className="PlaceDetails">
            {/*<div className="image-container">*/}
            {/*    <img src={place.photo.images.original.url} alt={`Photo of ${place.name}`}/>*/}
            {/*</div>*/}


            <h2>{place.name}</h2>

            <div className="rating">

            </div>

            <div className="price">
                {place.price}
            </div>

            <div className="ranking">
                {place.ranking}
            </div>

            <div className="certificates">

            </div>

            <div className="address">
                {place.address}
            </div>

            <div className="phone">
                {place.phone}
            </div>

            <div className="websites">
                <a href={place.web_url} target={'_blank'}>Trip Advisor</a>
                <a href={place.website} target={'_blank'}>Website</a>
            </div>
        </StyledPlaceDetails>
    );
}

export default PlaceDetails;