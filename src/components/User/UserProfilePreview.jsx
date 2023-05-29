import React, {useState} from 'react';
import UserProfile from "./UserProfile.jsx";


function UserProfilePreview({logout}) {
    const [shouldInvokeUserProfileUI, setShouldInvokeUserProfileUI] = useState(true)


    return (
        <div>
            <button onClick={() => setShouldInvokeUserProfileUI(!shouldInvokeUserProfileUI)}>Profile</button>
            <button onClick={logout}>Log out</button>

            {
                shouldInvokeUserProfileUI ?
                    <UserProfile />
                    :
                    <></>
            }
        </div>
    );
}

export default UserProfilePreview;