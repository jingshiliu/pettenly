import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import {collection, addDoc, GeoPoint} from 'firebase/firestore'

import {db, auth} from "../../config/firebase.js";
import {AuthContext} from "../../context/AuthContext.jsx";

import {uploadFile} from "../../utils/index.js";


const StyledPostCreator = styled.div`
  background-color: #fff;
  width: 500px;
  height: 700px;
  border-radius: 2em;
  transform: translateX(-50px);
`
function PostCreator({getPosts}) {
    const [adoptable, setAdoptable] = useState(true)
    const [petName, setPetName] = useState('')
    const [petImage, setPetImage] = useState(null)
    const [price, setPrice] = useState(0)
    const [lng, setLng] = useState(0)
    const [lat, setLat] = useState(0)
    const [description, setDescription] = useState('')
    const {isLoggedIn} = useContext(AuthContext)

    useEffect(()=>{
        getCurrentLocation()
    }, [])

    function getCurrentLocation(){
        alert("Getting current location, might take some time. Let's wait...")
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
            setLat(latitude)
            setLng(longitude)
        })
    }

    async function createPost(){
        if(!isLoggedIn){
            alert("Please log in to perform this action")
            return
        }

        try{
            const path = await uploadFile(petImage)
            console.log(path)
            await addDoc(collection(db, "post"), {
                adoptable,
                description,
                location: new GeoPoint(lat, lng),
                petName,
                petImage: path,
                postCreator: auth?.currentUser?.uid,
                price
            })
            getPosts()
            alert('Post created')
        }catch (e) {
            console.error(e)
        }
    }

    return (
        <StyledPostCreator>
            <input type="file"
                   onChange={e => setPetImage(e.target.files[0])}
            />

            <label>
                Pet Name:
                <input type="text"
                       placeholder={'Pet name...'}
                       value={petName}
                       onChange={e => setPetName(e.target.value)}
                />
            </label>

            <div>
                <label>
                    Adoptable:
                    <input type="checkbox"
                           checked={adoptable}
                           onChange={e => setAdoptable(e.target.checked)}
                    />
                </label>

                <label>
                    Price:
                    <input type="number"
                           placeholder={'Price...'}
                           value={price}
                           onChange={e => setPrice(Number(e.target.value))}
                    />
                </label>
            </div>

            <div>
                <h3>Location</h3>
                <label>
                    Latitude:
                    <input type="number"
                           placeholder={'Latitude...'}
                           value={lat}
                           onChange={e => setLat(Number(e.target.value))}
                    />
                </label>
                <label>
                    Longitude:
                    <input type="number"
                           placeholder={'Longitude...'}
                           value={lng}
                           onChange={e => setLng(Number(e.target.value))}
                    />
                </label>

                {/*<label>*/}
                {/*    Use Current Location:*/}
                {/*    <input type="checkbox"*/}
                {/*           checked={useCurrentLocation}*/}
                {/*           onChange={() => setUseCurrentLocation(!useCurrentLocation)}*/}
                {/*    />*/}
                {/*</label>*/}

                <button onClick={getCurrentLocation}>Current Location</button>
            </div>

            <label>
                Description:
                <br/>
                <textarea value={description}
                          onChange={e => setDescription(e.target.value)}
                          cols="30"
                          rows="10"></textarea>
            </label>

            <button onClick={createPost}>Create Post</button>

        </StyledPostCreator>
    );
}

export default PostCreator;