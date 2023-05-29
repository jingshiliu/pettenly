import React, {useContext, useEffect, useState} from 'react';
import styled, {ThemeProvider} from "styled-components";
import {collection, getDocs} from "firebase/firestore"
import {auth, db} from "./config/firebase.js";

import {AuthContext} from "./context/AuthContext.jsx";
import {ListContext} from "./context/ListContext.js";

import Header from "./components/Header.jsx";
import List from "./components/List/List.jsx";
import Map from "./components/Map.jsx";
import PostCreateButton from "./components/Post/PostCreateButton.jsx";
import PostCreator from "./components/Post/PostCreator.jsx";
import PostPreview from "./components/Post/PostPreview.jsx";
import PostDetail from "./components/Post/PostDetail.jsx";
import ListCard from "./components/List/ListCard.jsx";
import {nanoid} from "nanoid";


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
  overflow: hidden;

  main {
    position: relative;

    height: inherit;

    .List {
      width: 25%;
      height: 100%;
      position: absolute;
    }
  }
`;

function App() {
    const [coordinates, setCoordinates] = useState({})
    const [bound, setBound] = useState({});
    const [posts, setPosts] = useState([])
    const [selectedPost, setSelectedPost] = useState(undefined)
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
        setSelectedPost(undefined)
    }, [isLoggedIn])

    useEffect(() => {
        let timeId = setTimeout(() => {

        }, 1000)

        return () => {
            clearTimeout(timeId)
        }
    }, [bound, coordinates])

    async function getPosts() {
        try {
            const data = await getDocs(collection(db, "post"))
            const postList = data.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setPosts(postList)
            console.log(postList)
        } catch (e) {
            console.error(e)
        }
    }

    function createListRemoveFunction(index) {
        return function removeFromTheList() {
            setTheList([
                ...theList.slice(0, index),
                ...theList.slice(index + 1)
            ])
        }
    }

    function addToTheList(component){
        setTheList([...theList, component])
    }

    console.log(theList)

    return (
        <ThemeProvider theme={theme}>
            <ListContext.Provider value={{addToTheList}}>
                <StyledApp>
                    <Header additonalChildren={<PostCreateButton onClickInvokedUI={<PostCreator getPosts={getPosts}/>}/>}/>
                    <main>
                        <Map
                            setCoordinates={setCoordinates}
                            setBound={setBound}
                            coordinates={coordinates}
                        >
                            {posts.map((post) => {
                                return <PostPreview post={post}
                                                    setDisplayingPost={setSelectedPost}
                                                    lat={post.location.latitude}
                                                    lng={post.location.longitude}
                                                    key={post.id}
                                />})}
                        </Map>

                        <List>
                            {theList.map((listElement, index) =>
                                <ListCard key={nanoid()}
                                          removeFromTheList={createListRemoveFunction(index)}
                                >{listElement}</ListCard>)}
                        </List>
                    </main>
                </StyledApp>
            </ListContext.Provider>
        </ThemeProvider>
    )
}

export default App
