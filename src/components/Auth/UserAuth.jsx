import React, {useContext, useState} from 'react';
import {auth, googleAuthProvider} from '../../config/firebase.js'
import {AppContext} from "../../App.jsx";

import styled from "styled-components";
import SignIn from "./SignIn.jsx";
import UserProfile from "./UserProfile.jsx";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import SignInCard from "./SignInCard.jsx";

const StyledUserAuth = styled.div`

`

function UserAuth() {
    const {isLoggedIn, setIsLoggedIn} = useContext(AppContext)

    console.log(auth?.currentUser?.email)

    async function logIn(email, password){
        try{
            console.log('login in...')
            await signInWithEmailAndPassword(auth, email, password)
            console.log('logged in')
            setIsLoggedIn(true)
        }catch (err){
            console.error(err)
            console.log('unable to sign in')
            alert(err)
        }
    }

    async function createAccount(email, password){
        try{
            console.log('Creating Account')
            await createUserWithEmailAndPassword(auth, email, password)
            console.log('Created User and Signed In')
            setIsLoggedIn(true)
        }catch (err){
            console.error(err)
            alert(err)
        }
    }

    async function signInWithGoogle(){
        try{
            console.log('Signing in with Google')
            await signInWithPopup(auth, googleAuthProvider)
            console.log('Signed in with Google')
            setIsLoggedIn(true)
        }catch (err){
            console.error(err)
            alert(err)
        }
    }

    async function logout(){
        try{
            await signOut(auth)
            setIsLoggedIn(false)
        }catch (err){
            console.error(err)
        }
        console.log('signing out...')
    }

    return (
        <StyledUserAuth className={'UserAuth'}>
            {
                 isLoggedIn ?
                    <UserProfile logout={logout}  />
                    :
                     <SignIn>
                         <SignInCard logIn={logIn}
                                     createAccount={createAccount}
                                     signInWithGoogle={signInWithGoogle}
                         />
                     </SignIn>
            }
        </StyledUserAuth>
    );
}

export default UserAuth;