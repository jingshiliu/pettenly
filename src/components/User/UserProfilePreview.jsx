import React, {useContext, useState} from 'react';
import UserProfile from "./UserProfile.jsx";
import ListCard from "../List/ListCard.jsx";

import {ListContext} from "../../context/ListContext.js";

function UserProfilePreview({logout}) {
    const {addToTheList} = useContext(ListContext)
    return (
        <div>
            <button onClick={()=> addToTheList(<UserProfile />)}>Profile</button>
            <button onClick={logout}>Log out</button>
        </div>
    )
}

export default UserProfilePreview;