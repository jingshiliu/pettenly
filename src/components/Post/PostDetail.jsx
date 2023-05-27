import React, {useContext, useState} from 'react';
import styled from "styled-components";
import {addDoc, collection, Timestamp} from "firebase/firestore";

import {auth, db} from "../../config/firebase.js";
import {AuthContext} from "../../context/AuthContext.jsx";

const StyledPostDetail = styled.div`
  width: 400px;
  height: 300px;
  position: fixed;
  left: 50px;
  top: 100px;
  background-color: red;
`

function PostDetail({post}) {
    const [appointmentTime, setAppointmentTime] = useState(Date.now())
    const {isLoggedIn} = useContext(AuthContext)
    const {adoptable, price, description} = post

    if(!isLoggedIn) return null
    async function makeAppointment() {
        if(auth?.currentUser?.uid === post.postCreator){
            alert('Cannot make an appointment to yourself')
            return
        }
        try{
            await addDoc(collection(db, "appointment"), {
                from: auth.currentUser.uid,
                to: post.postCreator,
                time: appointmentTime
            })
            alert("Appointment Made")
        }catch (e){
            console.error(e)
        }
    }

    return (
        <StyledPostDetail>
            <div>
                Pet Image
            </div>
            {adoptable ? (
                <>
                    <span>Adoptable</span>
                </>) : (<label>
                Price: {price}
                </label>)}

            <label>
                Description: {description}
            </label>

            <label>
                Choose a time:
                <input type="datetime-local"
                       value={appointmentTime}
                       onChange={e => setAppointmentTime(e.target.value)}
                />
            </label>

            <button onClick={makeAppointment}>Make a appointment</button>
        </StyledPostDetail>
    );
}

export default PostDetail;