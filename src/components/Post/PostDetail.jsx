import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import {addDoc, collection, doc, getDoc, Timestamp} from "firebase/firestore";

import {auth, db} from "../../config/firebase.js";
import {createAppointment, getImageFromStorage} from "../../utils/index.js";
import {AppContext} from "../../context/AppContext.js";
import UserProfile from "../User/UserProfile.jsx";
import Messenger from "../Messenger/Messenger.jsx";

const StyledPostDetail = styled.div`
  width: 19vw;
  height: 34.8vh;
  position: relative;
  background-color: ${({theme}) => theme.colors.deepGreenBlue};
  color: ${({theme}) => theme.colors.lightGreen};
  padding: 20px;
  opacity: 0.94;
  border-radius: 1.4em;
  display: flex;
  overflow: hidden;
  flex-direction: column;

  button {
    border-radius: 0.6em;
    padding: 0.5em 1em;
    background-color: ${({theme}) => theme.colors.lightGreen2};
    color: ${({theme}) => theme.colors.deepGreenBlue2};
  }

  button:hover {
    filter: brightness(0.94);
  }

  .petImageContainer {
    width: 100%;
    height: 70%;
    border-radius: 0.6em;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .postDescriptionContainer {
    margin-top: 0.5em;
    
    .title{
      display: flex;
      justify-content: space-between;
      
      div{
        button{
          font-size: 10px;
          margin-left: 1em;
          margin-bottom: 0.2em;
        }
      }
    }

    hr {
      border: none;
      border-bottom: 1px solid ${({theme}) => theme.colors.lightGreen2};
    }

    p {
      font-size: 15px;
      font-weight: 200;
      padding: 0.2em 0.4em;

      @media (max-width: 1200px) {
        font-size: 12px;
      }
      @media (max-width: 1000px) {
        font-size: 10px;
      }
      @media (max-width: 700px) {
        font-size: 7px;
      }
    }
  }

  .appointmentContainer {
    margin-top: 0.6em;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 1700px) {
      flex-direction: column;

      button {
        margin-top: 5px;
        width: 100%;
      }

      label {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }



    input[type="datetime-local"] {
      border: none;
      border-radius: 0.4em;
      background-color: ${({theme}) => theme.colors.lightGreen};
      padding: 0.2em 0.5em;
    }
  }

`

function PostDetail({post}) {
    const [appointmentTime, setAppointmentTime] = useState('')
    const [petImage, setPetImage] = useState(null)
    const {addToTheList} = useContext(AppContext)

    useEffect(() => {
        const loadPetImage = async () => {
            setPetImage(await getImageFromStorage(post.petImage))
        }
        loadPetImage()
    }, [])

    async function makeAppointment() {
        if (auth?.currentUser?.uid === post.postCreator) {
            alert('Cannot make an appointment to yourself')
            return
        }

        if (!appointmentTime) {
            alert('Please select a time to make an appointment')
            return
        }

        const userDoc = await getDoc(doc(db, 'user', auth?.currentUser?.uid))
        const userName = userDoc.data().username

        createAppointment(auth?.currentUser?.uid, post.postCreator, appointmentTime, userName, post.petName, 'pending', '')
    }

    return (
        <StyledPostDetail>
            <div className={'petImageContainer'}>
                <img src={petImage} alt=""/>
            </div>

            <div className={'postDescriptionContainer'}>
                <div className={'title'}>
                    <span>{post.petName}'s intro</span>
                    <div className={'buttons'}>
                        <button onClick={()=> addToTheList(<UserProfile userId={post.postCreator}/>)}>See Post Creator</button>
                        <button onClick={()=> addToTheList(<Messenger newChatUserId={post.postCreator} />)}>Chat</button>
                    </div>
                </div>
                <hr/>
                <p>
                    {post.description}
                </p>
            </div>

            {auth?.currentUser?.uid !== post.postCreator
                ?   <div className="appointmentContainer">
                        <label>
                            Time:
                            <input type="datetime-local"
                                   value={appointmentTime}
                                   onChange={e => setAppointmentTime(e.target.value)}
                            />
                        </label>

                        <button onClick={makeAppointment}>Make an appointment</button>
                    </div>
                : null}

        </StyledPostDetail>
    );
}

export default PostDetail;