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
  .logoutButton{
    background-color: ${({theme})=> theme.colors.deepGreenBlue};
    color: ${({theme})=> theme.colors.lightGreen} ;
    height: 50px;
    padding: 0 1em;
    margin-left: 10px;
    border-radius: 1em;
    font-size: 20px;
  }
`

function UserAuth({logOutCleanUp}) {
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
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
            logOutCleanUp()
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
            email: auth?.currentUser?.email,
            image: 'PostImage/0.webpvuLLuKFO7y1qBJ3nMG05T'
        })
    }

    return (
        <StyledUserAuth className={'UserAuth'}>
            {
                 isLoggedIn ?
                    <>
                        <UserProfilePreview logout={logout}  />
                        <button onClick={logout} className={'logoutButton'}>Logout</button>
                    </>
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