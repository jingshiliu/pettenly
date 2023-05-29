import React from 'react';
import GoogleMapReact from 'google-map-react'
import googleMapCredential from '../credentials/google_map_credential.json'
import styled from "styled-components";
import mapStyle from "../MapStyle.js";


const StyledMap = styled.div`
    height: 100%;
    width: 100%;
`;

function Map({coordinates, setCoordinates, setBound, children}) {
    return (
        <StyledMap>
            <GoogleMapReact
                bootstrapURLKeys={{key: googleMapCredential.apiKey}}
                defaultCenter={{lat: 0, lng: 0}}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={mapStyle}
                onChange={(e) => {
                    setCoordinates({
                        lat: e.center.lat,
                        lng: e.center.lng
                    })
                    setBound(e.bounds)
                }}
                onChildClick={() => {
                    console.log('Map on Child Click')
                }}
            >
                {children}

            </GoogleMapReact>
        </StyledMap>
    );
}

export default Map;
