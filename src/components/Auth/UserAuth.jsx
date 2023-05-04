import React, {useState} from 'react';
import {auth} from '../../config/firebase.js'

import styled from "styled-components";
import SignIn from "./SignIn.jsx";
import UserProfile from "./UserProfile.jsx";

const StyledUserAuth = styled.div`

`

function UserAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(auth?.currentUser)

    console.log(auth?.currentUser?.email)

    return (
        <StyledUserAuth className={'UserAuth'}>
            {
                 isLoggedIn ?
                    <UserProfile setIsLoggedIn={setIsLoggedIn} />
                    :
                    <SignIn setIsLoggedIn={setIsLoggedIn} />
            }
        </StyledUserAuth>
    );
}

export default UserAuth;