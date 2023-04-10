import React from 'react';
import GoogleMapReact from 'google-map-react'
import googleMapCredential from '../credentials/google_map_credential.json'
import styled from "styled-components";


const StyledMap = styled.div`
    height: 100%;
    width: 100%;
`;

function Map({coordinates, setCoordinates, setBound}) {
    return (
        <StyledMap>
            <GoogleMapReact
                bootstrapURLKeys={{key: googleMapCredential.apiKey}}
                defaultCenter={{lat: 0, lng: 0}}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                // options={{}}
                onChange={(e) => {
                    setCoordinates({
                        lat: e.center.lat,
                        lng: e.center.lng
                    })
                    setBound({
                        bl: e.bounds.sw,
                        tr: e.bounds.ne
                    })
                }}
                onChildClick={() => {
                    console.log('Map on Child Click')
                }}
            >


            </GoogleMapReact>
        </StyledMap>
    );
}

export default Map;
