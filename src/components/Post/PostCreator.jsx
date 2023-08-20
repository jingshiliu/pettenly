import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import {collection, addDoc, GeoPoint, Timestamp} from 'firebase/firestore'

import {db, auth} from "../../config/firebase.js";
import {AuthContext} from "../../context/AuthContext.jsx";

import {getImageFromStorage, uploadFile} from "../../utils/index.js";
import {FiCheck} from "react-icons/fi";
import {BiCross} from 'react-icons/bi';
import Map from "../Map/Map.jsx";


const StyledPostCreator = styled.div`
  width: 19vw;
  height: 75vh;
  padding: 20px;
  border-radius: 1.4em;
  background-color: ${({theme}) => theme.colors.deepGreenBlue};
  color: ${({theme}) => theme.colors.lightGreen};
  opacity: 0.94;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  input[type='text'], textarea{
    padding: 0.3em 0.5em ;
    margin-left: 0.5em;
    border: none;
    border-radius: 0.4em;
    font-size: 15px;
    background-color: ${({theme}) => theme.colors.lightGreen};
    color: ${({theme}) => theme.colors.deepGreenBlue2};
  }
  
  .fileInputContainer{
    width: 100%;
    height: 100%;
    max-height: 250px;
    position: relative;
    overflow: hidden;
    margin-bottom: 10px;
    
    img{
      width: inherit;
      height: inherit;
      object-fit: cover;
      border-radius: 0.6em;
    }
    
    span{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      
      font-size: 20px;
      visibility: hidden;
    }
    
    input{
      cursor: pointer;
      position: absolute;
      left: 0;
      height: 150%;
      width: 100%;
      transform: translateY(-30%);
    }
  }

  .fileInputContainer:hover{
    cursor: pointer;
    
    img{
      filter: brightness(60%);
    }
    
    span{
      visibility: visible;
      filter: none;
    }
  }

  .isNotSelected{
    img{
      filter: brightness(60%);
    }

    span{
      visibility: visible;
      filter: none;
    }
  }
  
  .isNotSelected:hover{
    img{
      filter: brightness(70%);
    }
  }
  
  .petNameInputContainer{
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    
    button{
      color: ${({theme}) => theme.colors.lightGreen};
      background-color: ${({theme}) => theme.colors.deepGreenBlue2};
      padding: 0.4em 0.8em;
      border-radius: 0.4em;
      font-size: 15px;
    }
    
    button:hover{
      filter: brightness(120%);
    }
  }
  
  .descriptionInputContainer{
    margin-top: 10px;
    width: 96%;
    textarea{
      width: 100%;
      margin-left: 0;
      margin-top: 10px;
    }
  }
  
  .createdContainer{
    display: flex;
    align-items: center;
    margin-left: 0.5em;
    font-size: 14px;
    color: ${({theme}) => theme.colors.green};

    span{
      padding-right: 0.2em;
    }
  }
  
  .locationSelectorContainer{
    width: 100%;
    height: 100%;
    border-radius: 0.6em;
    overflow: hidden;
    position: relative;
    
    .crossIcon{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateY(-50%) translateX(-50%);
      font-size: 25px;
    }
    
    .Map{
      height: 105%;
    }
  }
`
function PostCreator({getPosts}) {
    const [adoptable, setAdoptable] = useState(true)
    const [petName, setPetName] = useState('')
    const [petImage, setPetImage] = useState(null)
    const [petImageUrl, setPetImageUrl] = useState('')
    const [price, setPrice] = useState(0)
    const [lng, setLng] = useState(0)
    const [lat, setLat] = useState(0)
    const [description, setDescription] = useState('')
    const [isCreated, setIsCreated] = useState(false)
    const [hasPhotoSelected, setHasPhotoSelected] = useState(false)
    const {isLoggedIn} = useContext(AuthContext)

    useEffect(()=>{
        getCurrentLocation()
        loadPetImage('PostImage/default.jpg')
    }, [])

    async function loadPetImage(path){
        const imagePath = await getImageFromStorage(path)
        setPetImageUrl(imagePath)
    }


    function getCurrentLocation(){
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
            setLat(latitude)
            setLng(longitude)
        })
    }

    async function handlePetImageChange(e){
        const imageFile = e.target.files[0]
        setPetImage(imageFile)

        const reader = new FileReader()

        reader.addEventListener('load', loadEvent =>{
            setHasPhotoSelected(true)
            setPetImageUrl(loadEvent.target.result)
        })

        reader.readAsDataURL(imageFile)
    }
    async function createPost(){
        if(!isLoggedIn){
            alert("Please log in to perform this action")
            return
        }

        try{
            const path = await uploadFile(petImage)

            await addDoc(collection(db, "post"), {
                adoptable,
                description,
                location: new GeoPoint(lat, lng),
                petName,
                petImage: path,
                postCreator: auth?.currentUser?.uid,
                price,
                createdAt: Timestamp.now()
            })
            getPosts()
            setIsCreated(true)
        }catch (e) {
            console.error(e)
        }
    }

    return (
        <StyledPostCreator>
            <div className={`fileInputContainer ${hasPhotoSelected ? '' : 'isNotSelected'}`}>
                <img src={petImageUrl} alt=""/>
                <input type="file"
                       onChange={handlePetImageChange}
                       placeholder={'Choose a Photo'}
                />

                <span>Choose a Photo</span>
            </div>

            <div className={'petNameInputContainer'}>
                <label>
                    Pet Name:
                    <input type="text"
                           placeholder={'Pet name...'}
                           value={petName}
                           onChange={e => setPetName(e.target.value)}
                    />
                </label>

                {
                    isCreated ?
                        <div className={'createdContainer'}>
                            <span>Created</span>
                            <FiCheck />
                        </div>
                        :
                        <button onClick={createPost}>Create Post</button>
                }
            </div>

            <div className="descriptionInputContainer">
                <label>
                    More about my pet
                    <br/>
                    <textarea value={description}
                              placeholder={'My pet is very cute...'}
                              onChange={e => setDescription(e.target.value)}
                              cols="40"
                              rows="5"></textarea>
                </label>
            </div>

            <div className="locationSelectorContainer">
                <Map centerCoordinate={{lat, lng}}
                     setCenterCoordinate={(coord) =>{
                         setLat(coord.lat)
                         setLng(coord.lng)
                         console.log(lat, lng)
                     }}
                />
                <div className={'crossIcon'}>
                    <BiCross />
                </div>
            </div>

        </StyledPostCreator>
    );
}

export default PostCreator;