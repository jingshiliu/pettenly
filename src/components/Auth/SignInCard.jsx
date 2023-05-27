import React, {useState} from 'react';
import styled from 'styled-components';
import {FcGoogle} from 'react-icons/fc';
import {MdOutlineMail} from 'react-icons/md';
import {RiLockPasswordLine} from 'react-icons/ri';
import {FiUser} from 'react-icons/fi';

const StyledSignInCard = styled.div`
  // center at the window
  position: fixed;
  left: 50vw;
  top: 50vh;
  transform: translateX(-50%) translateY(-50%);
  z-index: 10000;
  
  background-color: ${props => props.theme.colors.blue};
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 300px;
  justify-content: space-evenly;
  border-radius: 1em;
  padding: 2em;

  h2 {
    text-align: center;
    font-weight: 300;
  }

  label {
    transform: translateX(10px);
  }

  .inputContainer {
    border: 1px solid transparent;
    background-color: white;
    border-radius: 0.6em;
    padding: 0.5em;
    margin-top: 0.2em;
    display: flex;
    align-items: center;
    
    input{
      border: none;
      background-color: transparent;
      width: 100%;
      line-height: 1.2;
      color: ${props => props.theme.colors.black};
    }

    .inputIcon{
      height: 20px;
      width: 20px;
      border-right: 1px solid grey;
      padding-right: 5px;
      margin-right: 5px;
    }
  }

  .loginButtonsContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100px;
    color: white;
    
    .row{
      display: flex;
      height: 40px;
      justify-content: space-between;
    }
    
    .first-row{
      .loginButton{
        width: 49%;
      }
      
      .loginButton:first-child{
        background-color: #0077b6;
      }

      .loginButton:last-child{
        background-color: #00b4d8;
      }
    }
    
    .second-row{
      .loginButton{
        background-color: #caf0f8;
      }
    }

    .loginButton{
      width: 100%;
      background-color: white;
      border-radius: 0.6em;
      color: white;
    }

    button:hover {
      filter: brightness(0.9);
    }
    
  }

  .fcGoogleContainer {
    display: inline-block;
    
    .fcGoogle {
      vertical-align: baseline;
      height: 30px;
      width: 30px;
    }
  }

`

function SignInCard({logIn, createAccount, signInWithGoogle}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCreatingAccount, setIsCreatingAccount] = useState(true)
    const [username, setUsername] = useState('')

    function signIn(){
        if(isCreatingAccount)
            createAccount(email, password, username)
        else
            logIn(email, password)
    }

    return (
        <StyledSignInCard>
            <h2>
                {
                    isCreatingAccount ? 'Sign In' : 'Log In'
                }
            </h2>

            {
                !isCreatingAccount ? <></> :
                    <div className={'inputContainer'}>
                        <FiUser className={'inputIcon'} />
                        <input type="text"
                               placeholder={'Username...'}
                               onChange={e => setUsername(e.target.value)}
                        />
                    </div>
            }

            <div className={'inputContainer'}>
                <MdOutlineMail className={'inputIcon'} />
                <input type="email"
                       placeholder={'Email...'}
                       onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className={'inputContainer'}>
                <RiLockPasswordLine className={'inputIcon'}/>
                <input type="password"
                       placeholder={'Password...'}
                       onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className={'loginButtonsContainer'}>
                <div className="row first-row">
                    <button className={'loginButton'} onClick={() => setIsCreatingAccount(!isCreatingAccount)}>
                        {isCreatingAccount ? 'Log In' : 'Create Account'}
                    </button>

                    <button className={'loginButton'} onClick={signIn}>
                        Continue
                    </button>
                </div>

                <div className="row second-row">
                    <button className={'loginButton'} onClick={signInWithGoogle}>
                        <div className={'fcGoogleContainer'}>
                            <FcGoogle className={'fcGoogle'}/>
                        </div>
                    </button>
                </div>
            </div>
        </StyledSignInCard>
    );
}

export default SignInCard;