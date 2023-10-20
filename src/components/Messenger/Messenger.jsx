import React, {useEffect, useMemo, useState} from 'react';
import styled from "styled-components";

import {getChatPreviews, getUser} from "../../utils/index.js";
import {auth} from "../../config/firebase.js";
import ChatPreview from "./ChatPreview.jsx";
import Icon from "../Icon.jsx";
import Chat from "./Chat.jsx";

const StyledChat = styled.div`
  width: 50vw;
  height: 75vh;
  border-radius: 1.4em;
  background-color: ${({theme}) => theme.colors.deepGreenBlue};
  z-index: 1;
  padding: 20px;
  color: ${({theme}) => theme.colors.lightGreen};
  display: flex;
  justify-content: space-between;
  
  .leftCol{
    width: 25%;
    
    h1{
      margin-bottom: 10px;
      font-weight: normal;
    }
    
    .ChatPreview{
      margin-bottom: 5px;
    }
  }
  
  .chatContainer{
    width: 73%;
  }
`

function Messenger() {
    // two columns, left for chat selection with diff user, right for current chat
    // when component first load, fetch all the chats of current user from firebase
    // sorted with the order of last updated
    const [chats, setChats] = useState({})
    const [currentChatId, setCurrentChatId] = useState('')
    const [user, setUser] = useState({})

    useEffect(()=>{
        loadData()
            .catch(err => console.error(err))
        getUser()
            .then(userInfo => setUser({...userInfo, id: auth.currentUser.uid}))
            .catch(err => console.error(err))
    }, [])

    async function loadData(){
        const chatPreviews = await getChatPreviews()
        const newChats = {}
        for(let chatPreview of chatPreviews){
            let chatId = chatPreview.id
            let chatBuddyId = chatPreview.user1 === auth.currentUser.uid ? chatPreview.user2 : chatPreview.user1
            console.log(chatBuddyId)
            let chatBuddy = await getUser(chatBuddyId)
            newChats[chatId] = {
                ...chatPreview,
                chatBuddy
            }
        }
        setChats(newChats)
        setCurrentChatId(chatPreviews[0].id)
    }
    console.log(chats)

    return (
        <StyledChat>
            <section className={'leftCol'}>
                <h1><Icon /> Messenger</h1>
                <div className="chatPreview">
                    {Object.values(chats).map(chat =>
                        <ChatPreview
                            chatBuddyUserName={chat.chatBuddy.username}
                            setCurrentChat={setCurrentChatId}
                            chatId={chat.id}
                            key={chat.id}
                        />
                    )}
                </div>
            </section>
            <section className={'chatContainer'}>
                <Chat
                    chatId={currentChatId}
                    chatInfo={chats[currentChatId]}
                    user={user}
                />
            </section>
        </StyledChat>
    );
}

export default Messenger;