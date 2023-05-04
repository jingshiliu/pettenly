import React from 'react';
import {signOut} from "firebase/auth";
import {auth} from "../../config/firebase.js";

function UserProfile({setIsLoggedIn}) {

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
        <div>
            Profile
            <button onClick={logout}>Log out</button>
        </div>
    );
}

export default UserProfile;