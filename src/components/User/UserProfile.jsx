import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import PostPreview from "../Post/PostPreview.jsx";
import {nanoid} from "nanoid";
import {FiCheck} from 'react-icons/fi'
import {doc, getDoc, query, where, orderBy, collection, getDocs, updateDoc} from "firebase/firestore";
import {db, auth} from "../../config/firebase.js";

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
    console.log(appointment)
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

    return (
        <StyledAppointmentUI>
            <div className={'title'}>
                <span>{appointment.petName}</span>
                <span>{appointment.time}</span>
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
  position: absolute;
  left: 0;
  padding: 20px;
  color: ${({theme}) => theme.colors.lightGreen};
  overflow: hidden;
  
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
    
    img{
      width: inherit;
      height: inherit;
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
    const userProfile = {
        image: "https://firebasestorage.googleapis.com/v0/b/pettenly.appspot.com/o/PostImage%2F0.webpvuLLuKFO7y1qBJ3nMG05T?alt=media&token=a5a050a0-f416-4901-a227-9221c55606c0",
        email: 'gmail@helloworld.com',
        name: "Mr Asir",
        appointments: [
            {
                from: "bZhM701orDcqDYGNSa9gtQs4Fjg1",
                to: "v1PLcKwsPxcfrETFyu7krrgfgRG3",
                status: "pending",
                time: "2023-05-12T19:41",
                post: '',
                name: "Jingshi",
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum modi obcaecati rem quidem placeat repudiandae provident molestias vitae repellendus architecto, officia aliquid! Reprehenderit, culpa error facilis vitae perspiciatis debitis repellat ipsum dolore id blanditiis nulla quam quo aut ratione, illum possimus consectetur ducimus hic porro numquam facere optio esse modi.'
            },
            {
                from: "bZhM701orDcqDYGNSa9gtQs4Fjg1",
                to: "v1PLcKwsPxcfrETFyu7krrgfgRG3",
                status: "pending",
                time: "2023-05-12T19:41",
                post: '',
                name: "Haolin",
                message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum modi obcaecati rem quidem placeat repudiandae provident molestias vitae repellendus architecto, officia aliquid! Reprehenderit, culpa error facilis vitae perspiciatis debitis repellat ipsum dolore id blanditiis nulla quam quo aut ratione, illum possimus consectetur ducimus hic porro numquam facere optio esse modi.'
            }
        ],
        posts: [
            {
                description: "",
                petName: "Doudou",
                postCreator: "bZhM701orDcqDYGNSa9gtQs4Fjg1",
                price: 0,
                adoptable: true,
                petImage: "PostImage/0.webpvuLLuKFO7y1qBJ3nMG05T",
                location: {
                    latitude: 40.74507764291969,
                    longitude: -73.8318063477433
                },
                "id": "GPy8yiCTXBH2NHnheZdt"
            },{
                description: "",
                petName: "Doudou",
                postCreator: "bZhM701orDcqDYGNSa9gtQs4Fjg1",
                price: 0,
                adoptable: true,
                petImage: "PostImage/0.webpvuLLuKFO7y1qBJ3nMG05T",
                location: {
                    latitude: 40.74507764291969,
                    longitude: -73.8318063477433
                },
                "id": "GPy8yiCTXBH2NHnheZdt"
            },
            {
                description: "",
                petName: "Doudou",
                postCreator: "bZhM701orDcqDYGNSa9gtQs4Fjg1",
                price: 0,
                adoptable: true,
                petImage: "PostImage/0.webpvuLLuKFO7y1qBJ3nMG05T",
                location: {
                    latitude: 40.74507764291969,
                    longitude: -73.8318063477433
                },
                "id": "GPy8yiCTXBH2NHnheZdt"
            },
            {
                description: "",
                petName: "Doudou",
                postCreator: "bZhM701orDcqDYGNSa9gtQs4Fjg1",
                price: 0,
                adoptable: true,
                petImage: "PostImage/0.webpvuLLuKFO7y1qBJ3nMG05T",
                location: {
                    latitude: 40.74507764291969,
                    longitude: -73.8318063477433
                },
                "id": "GPy8yiCTXBH2NHnheZdt"
            },
        ]
    }

    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const [appointments, setAppointments] = useState([])

    useEffect(()=>{
        getUser()
        getPosts()
        getAppointments()
    }, [])

    async function getUser(){

        try{
            const userDoc = await getDoc(doc(db, 'user', auth?.currentUser?.uid))
            setUser(userDoc.data())
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
                where('to', '==', auth?.currentUser?.uid)
            ))

            const apptsData = []
            for(let appt of appts.docs)
                apptsData.push({
                    ...appt.data(),
                    id: appt.id
                })
            setAppointments(apptsData)
        }catch (e) {
            console.error(e)
        }
    }


    return (
        <StyledUserProfile>
            <div className="row first-row">
                <div className={'profilePhotoContainer'}>
                    <img src={userProfile.image} alt=""/>
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