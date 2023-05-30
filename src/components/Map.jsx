import React from 'react';
import GoogleMapReact from 'google-map-react'
import googleMapCredential from '../credentials/google_map_credential.json'
import styled from "styled-components";
import mapStyle from "../MapStyle.js";


const StyledMap = styled.div`
    height: 100%;
    width: 100%;
`;

function Map({centerCoordinate, setCenterCoordinate, children}) {
    return (
        <StyledMap className={'Map'}>
            <GoogleMapReact
                bootstrapURLKeys={{key: googleMapCredential.apiKey}}
                defaultCenter={{lat: 0, lng: 0}}
                center={centerCoordinate}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={mapStyle}
                onChange={(e) => {
                    setCenterCoordinate({
                        lat: e.center.lat,
                        lng: e.center.lng
                    })
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
