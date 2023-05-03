import React, {useEffect, useRef, useState} from 'react';
import styled, {ThemeProvider} from "styled-components";
import Header from "./components/Header.jsx";
import List from "./components/List.jsx";
import Map from "./components/Map.jsx";

import {mockPlaceData} from "./tempPlace.js";
import {getPlaceData} from "./api/index.js";

const theme = {
    colors: {
        blue: '#a2d2ff'
    }
}

const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;

  main{
    display: grid;
    grid-template-columns: 1fr 3fr;
    height: 95vh;
  }
`;


function App() {
    const [places, setPlaces] = useState(mockPlaceData)
    const [coordinates, setCoordinates] = useState({})
    const [bound, setBound] = useState({});


    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
            setCoordinates({lat: latitude, lng: longitude})
        })

    }, [])

    useEffect(()=>{
        let timeId = setTimeout(()=>{
            console.log(bound)
            console.log(places)
            // getPlaceData(bound.ne, bound.sw)
            //     .then(data =>{
            //         setPlaces(data)
            //     })
        }, 1000)

        return ()=>{
            clearTimeout(timeId)
        }
    }, [bound, coordinates])


    return (
        <ThemeProvider theme={theme}>
            <StyledApp>
                <Header/>
                <main>
                    <List places={places}/>
                    <Map
                        setCoordinates={setCoordinates}
                        setBound={setBound}
                        coordinates={coordinates}
                    />
                </main>
            </StyledApp>
        </ThemeProvider>
    )
}

export default App
