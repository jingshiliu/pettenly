import React from 'react';
import {signOut} from "firebase/auth";
import {auth} from "../../config/firebase.js";

function UserProfile({logout}) {



    return (
        <div>
            Profile
            <button onClick={logout}>Log out</button>
        </div>
    );
}

export default UserProfile;