import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import PostPreview from "../Post/PostPreview.jsx";
import {nanoid} from "nanoid";
import {FiCheck} from 'react-icons/fi'
import {doc, getDoc, query, where, orderBy, collection, getDocs, updateDoc} from "firebase/firestore";
import {db, auth} from "../../config/firebase.js";
import {getImageFromStorage, uploadFile} from "../../utils/index.js";

const StyledAppointmentUI = styled.div`
  width: 100%;
  padding-bottom: 20px;
  
  .title{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    span:first-of-type{
      color: ${({theme}) => theme.colors.deepGreenBlue2};
      padding: 0.4em 0.8em;
      background-color: ${({theme}) => theme.colors.blue};
      border-radius: 0.4em;
    }
  }
  
  p{
    padding: 0.8em 0.4em;
    padding-left: 0.6em;
    font-size: 13px;
    font-weight: 200;
  }
  
  .buttons{
    display: flex;
    justify-content: end;
    
    button{
      padding: 0.4em 0.8em;
      background-color: ${({theme}) => theme.colors.lightGreen2};
      border-radius: 0.4em;
    }
    
    button:hover{
      filter: brightness(90%);
    }
    
    .confirmContainer{
      display: flex;
      align-items: center;
      margin-left: 0.5em;
      font-size: 14px;
      color: ${({theme}) => theme.colors.green};
      
      span{
        padding-right: 0.2em;
      }
    }
  }
`

function AppointmentUI({appointment}) {
    const [isConfirmed, setIsConfirmed] = useState(appointment.status === 'confirmed')

    async function confirmAppointment(){
        try {
            const apptRef = doc(db, 'appointment', appointment.id)
            await updateDoc(apptRef, {
                status: 'confirmed'
            })
            setIsConfirmed(true)
            appointment.status = 'confirmed'
        }catch (e) {
            console.error(e)
        }
    }
    // 6 - 23 10:45
    function formatTime(time){
        time = new Date(time)

        return `${time.getMonth()}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`
    }

    return (
        <StyledAppointmentUI>
            <div className={'title'}>
                <span>{appointment.petName}</span>
                <span>{formatTime(appointment.time)}</span>
                <span>{appointment.name}</span>
            </div>

            <p>
                {appointment.message}
            </p>

            <div className={'buttons'}>
                {
                    isConfirmed ?
                        <button className={'rescheduleButton'}>
                            Reschedule
                        </button>
                        :
                        <></>
                }

                {
                    isConfirmed ?
                        <div className={'confirmContainer'}>
                            <span>Confirmed</span>
                            <FiCheck />
                        </div>
                        :
                        <button className={'confirmButton'}
                                onClick={confirmAppointment}
                        >
                            Confirm
                        </button>
                }
            </div>
        </StyledAppointmentUI>
    )
}


const StyledUserProfile = styled.div`
  width: 400px;
  height: 700px;
  border-radius: 1.4em;
  background-color: ${({theme}) => theme.colors.deepGreenBlue};
  z-index: 1;
  padding: 20px;
  color: ${({theme}) => theme.colors.lightGreen};
  overflow: hidden;
  opacity: 0.94;
  
  .row{
    width: 100%;
    padding: 10px 0;
  }
  
  .first-row{
    display: flex;
    justify-content: space-evenly;
    
    div:last-child{
      display: flex;
      flex-direction: column;
      justify-content: center;
      
      span:first-child{
        font-size: 25px;
      }
      
      span:last-child{
        font-size: 15px;
      }
    }
  }
  
  .profilePhotoContainer{
    height: 100px;
    width: 100px;
    border-radius: 20%;
    object-fit: contain;
    overflow: hidden;
    position: relative;
    
    img{
      width: inherit;
      height: inherit;
      object-fit: cover;
    }
    
    img:hover{
      cursor: pointer;
    }
    
    input{
      width: 100%;
      height: 150%;
      position: absolute;
      left: 0;
      top: -50%;
    }
  }
  
  .second-row{
    h3{
      font-weight: 400;
    }
    
    hr{
      border: none;
      border-top: 1px solid ${({theme}) => theme.colors.lightGreen};
    }
    
    .postListContainer{
      overflow: scroll;
      padding-top: 10px;
      width: 100%;
      
      .postsContainer{
        display: flex;
        width: fit-content;

        .PostPreview{
          width: 120px;
          height: 120px;
        }
        
        .postCard{
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 10px;
        }
      }
    }
  }
  
  .third-row{
    h3{
      font-weight: 400;
    }

    hr{
      border: none;
      border-top: 1px solid ${({theme}) => theme.colors.lightGreen};
    }
    
    .appointmentsContainer{
      padding-top: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      
      hr{
        position: relative;
        top: -10px;
        border-color: ${({theme}) => theme.colors.lightGreen2};
        width: 95%;
      }
    }
  }

`

function UserProfile() {
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const [appointments, setAppointments] = useState([])

    useEffect(()=>{
        loadData()
    }, [])

    function loadData(){
        getUser()
        getPosts()
        getAppointments()
    }

    async function getUser(){

        try{
            const userDoc = await getDoc(doc(db, 'user', auth?.currentUser?.uid))
            const userData = userDoc.data()
            const profilePhotoUrl = await getImageFromStorage(userData.image)
            setUser({
                ...userData,
                image: profilePhotoUrl
            })
        }catch (e){
            console.error(e)
        }
    }

    async function getPosts(){
        try{
            const postsSnapshot = await getDocs(query(
                collection(db, 'post'),
                where('postCreator', '==', auth?.currentUser?.uid),
                orderBy('createdAt', 'desc')
            ))

            const postsData = []
            for(let post of postsSnapshot.docs){
                postsData.push({
                    ...post.data(),
                    id: post.id
                })
            }
            console.log(postsData)

            setPosts(postsData)
        }catch (e){
            console.error(e)
        }

    }

    async function getAppointments(){
        try {
            const appts = await getDocs(query(
                collection(db, 'appointment'),
                where('to', '==', auth?.currentUser?.uid),
                orderBy('time', 'desc')
            ))

            const apptsData = []
            for(let appt of appts.docs)
                apptsData.push({
                    ...appt.data(),
                    id: appt.id,
                    time: appt.data().time.toDate()
                })
            setAppointments(apptsData)
        }catch (e) {
            console.error(e)
        }
    }

    async function uploadProfilePhoto(image){
        // uploadPhoto
        // upload user doc
        // refresh
        console.log("image")
        try {
            const path = await uploadFile(image, 'profile')
            await updateDoc(doc(db, 'user', auth?.currentUser?.uid),{
                image: path
            })
            loadData()
        }catch (e) {
            console.error(e)
        }
    }


    return (
        <StyledUserProfile>
            <div className="row first-row">
                <div className={'profilePhotoContainer'}>
                    <img src={user.image} alt=""/>
                    <input type="file"
                           onChange={e => uploadProfilePhoto(e.target.files[0])}
                    />
                </div>

                <div>
                    <span>{user.username}</span>
                    <br/>
                    <span>{user.email}</span>
                </div>
            </div>

            <div className="row second-row">
                <h3>Posts</h3>
                <hr/>
                <div className="postListContainer">
                    <div className="postsContainer">
                        {posts.map(post =>
                            <div className={'postCard'}>
                                <PostPreview key={nanoid()}
                                             post={post}
                                />
                                <span>
                                {post.petName ? post.petName : "Doudou"}
                                </span>
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>

            <div className="row third-row">
                <h3>Appointments</h3>
                <hr/>
                <div className="appointmentsContainer">
                    {
                        appointments ?
                            appointments.map(appointment =>
                                <>
                                    <AppointmentUI key={nanoid()} appointment={appointment} />
                                    <hr/>
                                </>
                            )
                            :
                            <div>
                                No Appointment Found
                            </div>
                    }
                </div>
            </div>
        </StyledUserProfile>
    );
}

export default UserProfile;