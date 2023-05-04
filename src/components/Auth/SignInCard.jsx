import React, {useState} from 'react';
import styled from 'styled-components';

const StyledSignInCard = styled.div`
  position: fixed;
  left: 50vw;
  top: 50vh;
  transform: translateX(-50%) translateY(-50%);
  z-index: 10000;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 300px;
  justify-content: space-evenly;
  border-radius: 1em;
  padding: 2em;

  h2{
    text-align: center;
  }
  label{
    transform: translateX(10px);
  }

  input{
    width: 95%;
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
  
`
function SignInCard({logIn, createAccount, signInWithGoogle}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <StyledSignInCard>
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
                <button onClick={() => logIn(email, password)}>Login</button>
                <button onClick={() => createAccount(email, password)}>Create Account</button>
                <button onClick={signInWithGoogle}>Login With Google</button>
            </div>
        </StyledSignInCard>
    );
}

export default SignInCard;