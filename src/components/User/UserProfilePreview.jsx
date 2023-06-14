import React, {useContext, useEffect, useState} from 'react';
import UserProfile from "./UserProfile.jsx";
import {AppContext} from "../../context/AppContext.js";
import {doc, getDoc} from "firebase/firestore";
import {auth, db} from "../../config/firebase.js";
import {getImageFromStorage} from "../../utils/index.js";
import styled from "styled-components";

const StyledUserProfilePreview = styled.div`
  button{
    display: block;
    height: 54px;
    width: 54px;
    border-radius: 0.6em;
    overflow: hidden;
    border: 3px solid ${({theme}) => theme.colors.deepGreenBlue};
    
    img{
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`

function UserProfilePreview() {
    const [profilePhotoUrl, setProfilePhotoUrl] = useState('')
    const {addToTheList} = useContext(AppContext)

    useEffect(()=>{
        loadImage()
    },[])

    async function loadImage(){
        const userDoc = await getDoc(doc(db, 'user', auth?.currentUser?.uid))
        const userData = userDoc.data()
        const profilePhotoUrl = await getImageFromStorage(userData.image)
        setProfilePhotoUrl(profilePhotoUrl)
    }

    return (
        <StyledUserProfilePreview>
            <button onClick={()=> addToTheList(<UserProfile updateProfilePreviewPhoto={setProfilePhotoUrl} />)}>
                <img src={profilePhotoUrl} alt=""/>
            </button>

        </StyledUserProfilePreview>
    )
}

export default UserProfilePreview;