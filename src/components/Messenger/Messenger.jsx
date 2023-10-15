import React, {useEffect, useState} from 'react';
import styled from "styled-components";

import {getChatPreviews, getUser} from "../../utils/index.js";
import {auth} from "../../config/firebase.js";
import ChatPreview from "./ChatPreview.jsx";

const StyledChat = styled.div`
  width: 50vw;
  height: 75vh;
  border-radius: 1.4em;
  background-color: ${({theme}) => theme.colors.deepGreenBlue};
  z-index: 1;
  padding: 20px;
  color: ${({theme}) => theme.colors.lightGreen};
  display: flex;
  
  .chatPreview{
    width: 30%;
    
    h1{
      margin-bottom: 10px;
    }
  }
  
  .chat{
    width: 70%;
  }
`

function Messenger() {
    // two columns, left for chat selection with diff user, right for current chat
    // when component first load, fetch all the chats of current user from firebase
    // sorted with the order of last updated
    const [chats, setChats] = useState({})
    const [currentChat, setCurrentChat] = useState({})
    const userId = auth?.currentUser?.uid
    console.log(currentChat)


    useEffect(()=>{
        loadData()
            .catch(err => console.error(err))
    }, [])

    async function loadData(){
        const chatPreviews = await getChatPreviews()
        const newChats = {}
        for(let chatPreview of chatPreviews){
            let chatId = chatPreview.id
            let receiverId = chatPreview.user1 === userId ? chatPreview.user2 : chatPreview.user1
            let receiver = await getUser(receiverId)
            newChats[chatId] = {
                ...chatPreview,
                receiverId,
                receiverEmail: receiver.email,
                receiverImage: receiver.image,
                receiverUserName: receiver.username
            }
        }
        setChats(newChats)
        setCurrentChat(newChats[chatPreviews[0].id])
    }

    return (
        <StyledChat>
            <section className={'chatPreview'}>
                <h1>Messenger</h1>
                {Object.values(chats).map(chat =>
                    <ChatPreview
                        receiverUserName={chat.receiverUserName}
                        setCurrentChat={setCurrentChat}
                        chatId={chat.id}
                        key={chat.id}
                    />
                )}
            </section>
            <section className={'chat'}>

            </section>
        </StyledChat>
    );
}

export default Messenger;