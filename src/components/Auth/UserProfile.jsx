import React from 'react';


function UserProfile({logout}) {
    return (
        <div>
            Profile
            <button onClick={logout}>Log out</button>
        </div>
    );
}

export default UserProfile;