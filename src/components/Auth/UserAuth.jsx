import React, {useContext} from 'react';
import {auth, db, googleAuthProvider} from '../../config/firebase.js'
import {setDoc, doc, getDoc} from "firebase/firestore";
import {AuthContext} from "../../context/AuthContext.jsx";

import styled from "styled-components";
import SignIn from "./SignIn.jsx";
import UserProfilePreview from "../User/UserProfilePreview.jsx";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import SignInCard from "./SignInCard.jsx";

const StyledUserAuth = styled.div`

`

function UserAuth() {
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

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

    async function createAccount(email, password, username){
        try{
            console.log('Creating Account')
            await createUserWithEmailAndPassword(auth, email, password)
            console.log('Created User and Signed In')
            await createUserObject(username)
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
            await createUserObject('',true)
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


    async function createUserObject(username, isGoogle=false){
        const id = auth?.currentUser?.uid
        if(isGoogle){
            const userSnapshot = await getDoc(doc(db, "user", id))
            if(userSnapshot.exists())
                return
            username = auth?.currentUser?.displayName
        }

        await setDoc(doc(db, "user", id), {
            username,
            email: auth?.currentUser?.email
        })
    }

    return (
        <StyledUserAuth className={'UserAuth'}>
            <button onClick={logout}>Sign out</button>
            {
                 isLoggedIn ?
                    <UserProfilePreview logout={logout}  />
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