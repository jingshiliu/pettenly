import React, {useState} from 'react';
import styled from "styled-components";

const StyledSignIn = styled.div`
  .background {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 70%;
    transition: opacity 0.2s ease-in-out;
    z-index: 9999;
  }
`

function SignIn({children}) {
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    return (
        <StyledSignIn>
            <button onClick={() => setIsLoggingIn(true)}>
                Sign In
            </button>

            {
                isLoggingIn && (
                    <>
                        <div className={'background'}
                             onClick={() => setIsLoggingIn(false)}
                        ></div>
                        {children}
                    </>
                )
            }
        </StyledSignIn>
    );
}

export default SignIn;