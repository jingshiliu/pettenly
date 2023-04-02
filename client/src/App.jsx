import React from 'react';
import styled, {ThemeProvider} from "styled-components";
import Header from "./components/Header.jsx";
import List from "./components/List.jsx";
import Map from "./components/Map.jsx";

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
    return (
        <ThemeProvider theme={theme}>
            <StyledApp>
                <Header/>
                <main>
                    <List/>
                    <Map/>
                </main>
            </StyledApp>
        </ThemeProvider>
    )
}

export default App
