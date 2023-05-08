import React, {useEffect, useState} from 'react';
import styled, {ThemeProvider} from "styled-components";

import AuthContextProvider from "./context/AuthContext.jsx";

import Header from "./components/Header.jsx";
import List from "./components/List.jsx";
import Map from "./components/Map.jsx";
import {auth} from "./config/firebase.js";
import PostCreateButton from "./components/PostCreation/PostCreateButton.jsx";
import PostCreator from "./components/PostCreation/PostCreator.jsx";


const theme = {
    colors: {
        blue: '#a2d2ff'
    }
}

const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;

  main{
    position: relative;
    
    height: 95vh;
    
    .List{
      width: 25%;
      height: 100%;
      position: absolute;
    }
  }
`;





function App() {
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

        }, 1000)

        return ()=>{
            clearTimeout(timeId)
        }
    }, [bound, coordinates])


    return (
        <ThemeProvider theme={theme}>
            <AuthContextProvider>
                <StyledApp>
                    <Header/>
                    <main>
                        <Map
                            setCoordinates={setCoordinates}
                            setBound={setBound}
                            coordinates={coordinates}
                        />

                        <List />
                        <PostCreateButton onClickInvokedUI={<PostCreator />}/>
                    </main>
                </StyledApp>
            </AuthContextProvider>
        </ThemeProvider>
    )
}

export default App
