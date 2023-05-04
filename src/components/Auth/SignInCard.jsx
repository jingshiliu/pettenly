import React, {useState} from 'react';
import styled from 'styled-components';
import {auth, googleAuthProvider} from '../../config/firebase.js'
import {createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword} from 'firebase/auth'

const StyledSignInCard = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  margin: 0;
  display: flex;
  
  align-items: center;
  justify-content: center;

  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 70%;
    transition: opacity 0.2s ease-in-out;
    z-index: 10000;
  }

  .signInCardBody {
    z-index: 10000;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    height: 400px;
    width: 400px;
    justify-content: space-evenly;
    border-radius: 1em;
    
    label{
      transform: translateX(10px);
    }
    
    input{
      border: 1px solid gray;
      border-radius: 1em;
      padding: 0.5em;
      transform: translateX(-10px);
      margin-top: 0.2em;
    }
    
    .loginButtonsContainer{
      display: flex;
      flex-direction: column;
    }
  }
`
function SignInCard({setIsLoggingIn, setIsLoggedIn}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function logIn(){
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

    async function createAccount(){
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
            console.err(err)
            alert(err)
        }
    }

    return (
        <StyledSignInCard>
            <div className={'background'}
                 onClick={() => setIsLoggingIn(false)}
            ></div>
            <div className={'signInCardBody'}>
                <h2>Log In</h2>
                <label>
                    Email
                    <br />
                    <input type="email"
                           placeholder={'Email...'}
                           onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <label htmlFor="">
                    Password
                    <br />
                    <input type="password"
                           placeholder={'Password...'}
                           onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <div className={'loginButtonsContainer'}>
                    <button onClick={logIn}>Login</button>
                    <button onClick={createAccount}>Create Account</button>
                    <button onClick={signInWithGoogle}>Login With Google</button>
                </div>
            </div>
        </StyledSignInCard>
    );
}

export default SignInCard;