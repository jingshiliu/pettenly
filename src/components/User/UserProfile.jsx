import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import PostPreview from "../Post/PostPreview.jsx";
import {nanoid} from "nanoid";
import {FiCheck} from 'react-icons/fi'
import {doc, updateDoc} from "firebase/firestore";
import {db, auth} from "../../config/firebase.js";
import {getAppointments, getPosts, getUser, uploadFile} from "../../utils/index.js";
import {AppContext} from "../../context/AppContext.js";
import PostListAllCard from "../Post/PostListCard/PostListAllCard.jsx";
import PostListSingleCard from "../Post/PostListCard/PostListSingleCard.jsx";

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
  width: 19vw;
  height: 75vh;
  border-radius: 1.4em;
  background-color: ${({theme}) => theme.colors.deepGreenBlue};
  z-index: 1;
  padding: 20px;
  color: ${({theme}) => theme.colors.lightGreen};
  overflow: hidden;
  opacity: 0.94;
  display: flex;
  flex-direction: column;
  justify-content: start;
  
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
    
    input{
      width: 100%;
      height: 150%;
      position: absolute;
      left: 0;
      top: -50%;
      z-index: 1;
    }
    
    span{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      visibility: hidden;
      
    }
  }

  .profilePhotoContainer:hover{
    cursor: pointer;
    
    img{
      filter: brightness(0.6);
    }
    
    span{ 
      visibility: visible;
    }
  }
  
  .no-hover:hover{
    cursor: auto;
    img{
      filter: brightness(1);
    }
  }
  
  .second-row{
    min-height: 21%;
    
    h3{
      font-weight: 400;
    }
    
    hr{
      border: none;
      border-top: 1px solid ${({theme}) => theme.colors.lightGreen};
    }
    
    .postTitleContainer{
      display: flex;
      justify-content: space-between;
      
      button{
        color: ${({theme}) => theme.colors.lightGreen};
        background-color: #fff4;
        padding: 0 1em;
        border-radius: 0.4em;
        position: relative;
        bottom: 0.1em;
        
        :hover{
          background-color: #fff6;
        }
      }
    }
    
    .postListContainer{
      padding-top: 10px;
      width: 100%;
      height: 100%;
      overflow: hidden;
      
      .postsContainer{
        display: flex;
        width: 100%;

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
        
        .PostListSingleCard{
          margin: 0;
          margin-bottom: 0.5em;
          width: 100%;
          
        }
      }
      
      .flex-col{
        flex-direction: column;
      }
    }
  }
  
  
  .third-row{
    height: 100%;
    position: relative;

    
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
      height: 100%;
      overflow: hidden;
      
      hr{
        position: relative;
        top: -10px;
        border-color: ${({theme}) => theme.colors.lightGreen2};
        width: 95%;
      }
    }
  }

`

function UserProfile({updateProfilePreviewPhoto, userId}) {
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const [appointments, setAppointments] = useState([])
    const {addToTheList, refreshPosts} = useContext(AppContext)
    console.log(addToTheList, refreshPosts)

    if (! userId) userId = auth?.currentUser?.uid
    const isOwnProfile = userId === auth?.currentUser?.uid

    useEffect(()=>{
        loadData()
    }, [])

    function loadData(){
        getUser(userId)
            .then(user =>{
                setUser(user)
                if(updateProfilePreviewPhoto)
                    updateProfilePreviewPhoto(user.image)
            })
            .catch(err => console.error(err))

        getPosts(userId)
            .then(postsData => setPosts(postsData))
            .catch(err => console.error(err))

        isOwnProfile && getAppointments()
                        .then(appts => setAppointments(appts))
                        .catch(err => console.error(err))
    }


    async function uploadProfilePhoto(image){
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
                <div className={`profilePhotoContainer ${isOwnProfile ? '': 'no-hover'}`}>
                    <img src={user.image} alt=""/>

                    {
                        isOwnProfile
                        ?
                            <>
                                <input type="file"
                                       onChange={e => uploadProfilePhoto(e.target.files[0])}
                                />

                                <span>Upload</span>
                            </>
                            : null}
                </div>

                <div>
                    <span>{user.username}</span>
                    <br/>
                    <span>{user.email}</span>
                </div>
            </div>

            <div className="row second-row">
                <div className={'postTitleContainer'}>
                    <h3>Posts</h3>
                    {
                        isOwnProfile
                        ?
                            <button
                                onClick={() => addToTheList(<PostListAllCard
                                    postList={posts}
                                    userData={user}
                                />)
                                }
                            >
                                See All
                            </button> : <></>
                    }
                </div>
                <hr/>
                <div className="postListContainer">
                    <div className={`postsContainer ${isOwnProfile? '': 'flex-col'}`}>
                        {
                            isOwnProfile
                            ? posts.map(post =>
                                        <div className={'postCard'}>
                                            <PostPreview key={post.id}
                                                         post={post}
                                            />
                                            <span>
                                                {post.petName ? post.petName : "Doudou"}
                                            </span>
                                        </div>)
                                :
                                posts.map(post => <PostListSingleCard post={post}/>)
                        }
                    </div>
                </div>
            </div>

            {isOwnProfile
                ?
                <div className="row third-row">
                        <h3>Appointments</h3>
                        <hr/>
                        <div className="appointmentsContainer">
                            {
                                appointments.length > 0 ?
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
                </div> : null}
        </StyledUserProfile>
    );
}

export default UserProfile;