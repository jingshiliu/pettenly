import React from 'react';
import styled from "styled-components";

const StyledChat = styled.div`
  width: 50vw;
  height: 75vh;
  border-radius: 1.4em;
  background-color: ${({theme}) => theme.colors.deepGreenBlue};
  z-index: 1;
  padding: 20px;
  color: ${({theme}) => theme.colors.lightGreen};
`

function Messenger() {
    // two columns, left for chat selection with diff user, right for current chat
    // when component first load, fetch all the chats of current user from firebase
    // sorted with the order of last updated

    return (
        <StyledChat>
            <h1>I'm a chat</h1>
        </StyledChat>
    );
}

export default Messenger;