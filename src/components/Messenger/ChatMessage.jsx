import React, {useContext} from 'react';
import styled from "styled-components";
import {auth} from "../../config/firebase.js";
import {AppContext} from "../../context/AppContext.js";
import UserProfile from "../User/UserProfile.jsx";

const StyledChatMessage = styled.div`
  img{
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 20%;
  }
  
  .messageBox{
    width: 100%;
    display: flex;
    
    .messageContainer{
      display: inline-block;
      align-self: center;
      padding: 0.2em 0.5em;
      transform: translateY(-0.2em);
    }
  }
  
  .user{
    justify-content: end;
  }
  
  .chatBuddy{

  }
`

function ChatMessage({chatBuddy, message, user}) {
    const {addToTheList} = useContext(AppContext)

    let Message;
    if(message.sender === user.id){
        Message = (
            <div className={'user messageBox'}>
                <div className="messageContainer">
                    <span>{message.message}</span>
                </div>
                <img src={user.image} alt={'Profile image of user'}/>
            </div>
        )
    }else{
        Message = (
            <div className={'chatBuddy messageBox'}>
                <img onClick={() => addToTheList(<UserProfile userId={chatBuddy.id}/>)} src={chatBuddy.image} alt="Profile image of other people"/>
                <div className="messageContainer">
                    <span>{message.message}</span>
                </div>
            </div>
        )
    }

    return (
        <StyledChatMessage className={'ChatMessage'}>
            {Message}
        </StyledChatMessage>
    );
}

export default ChatMessage;