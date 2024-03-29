import React, { useContext, useEffect, useState} from 'react';
import styled, {ThemeProvider} from "styled-components";
import {collection, getDocs} from "firebase/firestore"
import {auth, db} from "./config/firebase.js";

import {AuthContext} from "./context/AuthContext.jsx";
import {AppContext} from "./context/AppContext.js";

import Header from "./components/Header.jsx";
import List from "./components/List/List.jsx";
import Map from "./components/Map/Map.jsx";
import PostCreateButton from "./components/Post/PostCreateButton.jsx";
import PostCreator from "./components/Post/PostCreator.jsx";
import PostPreview from "./components/Post/PostPreview.jsx";
import ListCard from "./components/List/ListCard.jsx";
import {nanoid} from "nanoid";
import DoubleCard from "./components/List/DoubleCard.jsx";
import UserAuth from "./components/Auth/UserAuth.jsx";
import Messenger from "./components/Messenger/Messenger.jsx";


const theme = {
    colors: {
        blue: '#a2d2ff',
        black: '#2b2d42',
        deepGreenBlue: '#0077b6',
        greenBlue: '#00b4d8',
        lightGreen: '#caf0f8',
        deepGreenBlue2: '#01497c',
        lightGreen2: '#89c2d9',
        green: '#2ec4b6',
    }
}

const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: clip;
  color: ${({theme})=> theme.colors.lightGreen} ;
  
  *{
    font-family: 'Comic Sans MS', "Courier New", serif;
    scrollbar-color: ${({theme}) => theme.colors.deepGreenBlue2} transparent;
    
    ::-webkit-scrollbar{
      background-color: transparent;
      width: 5px;
    }
    
    ::-webkit-scrollbar-thumb{
      background-color: ${({theme})=> theme.colors.deepGreenBlue2};
      border-radius: 1em;
    }
  }

  main {
    position: relative;

    height: inherit;

    .List {
      width: 25%;
      height: 100%;
      position: absolute;
    }
  }

  .authContainer{
    height: 100%;
    width: fit-content;
    margin-left: 5px;
    
    .UserAuth{
      height: 100%;
      width: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      
    }
  }
  
  .button{
    font-size: 20px;
    height: 50px;
    text-align: center;
    padding: 0.2em 2em;
    margin-left: 1em;
    border-radius: 1em;
    background-color: ${({theme})=> theme.colors.deepGreenBlue2};
    color: ${({theme})=> theme.colors.lightGreen} ;
  }
`;

function App() {
    const [coordinates, setCoordinates] = useState({})
    const [posts, setPosts] = useState([])
    const [theList, setTheList] = useState([])

    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

    // syncing auth state and isLoggedIn with this piece of code is genius
    if (Boolean(auth?.currentUser) !== isLoggedIn) {
        setIsLoggedIn(Boolean(auth?.currentUser))
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude})
        })
        getPosts()
    }, [])


    useEffect(() => {
        let timeId = setTimeout(() => {

        }, 1000)

        return () => {
            clearTimeout(timeId)
        }
    }, [coordinates])

    async function getPosts() {
        try {
            const data = await getDocs(collection(db, "post"))
            const postList = data.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setPosts(postList)
        } catch (e) {
            console.error(e)
        }
    }

    function createListRemoveFunction(index) {
        return function removeFromTheList(index2) {
            if(index2 !== undefined){
                if(theList[index].length === 2){
                    const indexToKeep = index2 === 0? 1 : 0
                    setTheList([
                        ...theList.slice(0, index),
                        [theList[index][indexToKeep]],
                        ...theList.slice(index + 1)
                    ])
                    return
                }
            }

            setTheList([
                ...theList.slice(0, index),
                ...theList.slice(index + 1)
            ])
        }
    }

    function addToTheList(component, isHalfSizeComponent){
        const newListElement = {
            component,
            id: nanoid()
        }
        if (!isHalfSizeComponent)
            setTheList([...theList, newListElement])
        else
            addHalfSizeComponentToTheList(newListElement)
    }

    function addHalfSizeComponentToTheList(newListElement){
        for(let i = 0; i < theList.length; i++){
            const listElement = theList[i]
            if(Array.isArray(listElement) && listElement.length < 2){
                setTheList([
                    ...theList.slice(0, i),
                    [...listElement, newListElement],
                    ...theList.slice(i+1)
                ])
                return
            }
        }

        setTheList([...theList, [newListElement]])
    }

    function logOutCleanUp(){
        setTheList([])
    }



    return (
        <ThemeProvider theme={theme}>
            <AppContext.Provider value={{addToTheList: addToTheList, refreshPosts: getPosts}}>
                <StyledApp>
                    <Header>
                        <div className="authContainer">
                            <UserAuth logOutCleanUp={logOutCleanUp} />
                        </div>
                        {
                            isLoggedIn ?
                                <>
                                    <PostCreateButton onClickInvokedUI={<PostCreator getPosts={getPosts}/>}/>
                                    <button className={'button'} onClick={getPosts}>Refresh</button>
                                    <button
                                        className={'button'}
                                        onClick={()=> addToTheList(<Messenger/>)}>Chat</button>
                                </>
                                :<></>
                        }
                    </Header>
                    <main>
                        <Map
                            centerCoordinate={coordinates}
                        >
                            {posts.map((post) => {
                                return <PostPreview post={post}
                                                    lat={post.location.latitude}
                                                    lng={post.location.longitude}
                                                    key={post.id}
                                />})}
                        </Map>

                        <List>
                            {theList.map((listElement, index) =>{
                                if(Array.isArray(listElement)){
                                    return <DoubleCard key={listElement[0].id}
                                                       removeFromTheList={createListRemoveFunction(index)}
                                                       components={listElement}
                                    />
                                }
                                return <ListCard key={listElement.id}
                                                 removeFromTheList={createListRemoveFunction(index)}
                                >{listElement.component}</ListCard>})}
                        </List>
                    </main>
                </StyledApp>
            </AppContext.Provider>
        </ThemeProvider>
    )
}

export default App
