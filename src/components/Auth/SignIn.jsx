import React, {useState} from 'react';
import SignInCard from "./SignInCard.jsx";

function SignIn({setIsLoggedIn}) {
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    return (
        <div>
            <button onClick={() => setIsLoggingIn(true)}>
                Sign In
            </button>

            {
                isLoggingIn &&
                    <SignInCard setIsLoggingIn={setIsLoggingIn} setIsLoggedIn={setIsLoggedIn} />
            }
        </div>
    );
}

export default SignIn;