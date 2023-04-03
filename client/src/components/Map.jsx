import React from 'react';
import GoogleMapReact from 'google-map-react'
import googleMapCredential from '../credentials/googleMapCredential.json'
import styled from "styled-components";


const StyledMap = styled.div`
    height: 100%;
    width: 100%;
`;

function Map() {
    const coordinate = {lat: 0, lng: 0}
    return (
        <StyledMap>
            <GoogleMapReact
                bootstrapURLKeys={{key: googleMapCredential.apiKey}}
                defaultCenter={coordinate}
                center={coordinate}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                // options={{}}
                onChange={() => {
                    console.log('Map on change')
                }}
                onChildClick={() => {
                    console.log('Map on Child Click')
                }}
            >
                <div>
                    Hello
                </div>

            </GoogleMapReact>
        </StyledMap>
    );
}

export default Map;
//
// const AnyReactComponent = ({ text }) => <div>{text}</div>;
//
// export default function SimpleMap(){
//     const defaultProps = {
//         center: {
//             lat: 10.99835602,
//             lng: 77.01502627
//         },
//         zoom: 11
//     };
//
//     return (
//         // Important! Always set the container height explicitly
//         <div style={{ height: '100vh', width: '100%' }}>
//             <GoogleMapReact
//                 bootstrapURLKeys={{ key: "AIzaSyAOhDQsllY-qrUfADq17g2WBAHKb8BR3As" }}
//                 defaultCenter={defaultProps.center}
//                 defaultZoom={defaultProps.zoom}
//             >
//                 <AnyReactComponent
//                     lat={59.955413}
//                     lng={30.337844}
//                     text="My Marker"
//                 />
//             </GoogleMapReact>
//         </div>
//     );
// }