import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../store/authContext';
import Card from './UI/Card';

const Styles = {
  Auth: styled.div`
    width: 30rem;
    margin: 2rem auto;
    max-width: 80%;
    text-align: center;
  `
}

const Auth = () => {
  const authContext = useContext(AuthContext)

  const loginHandler = () => {
    authContext.login()
  };

  return (
    <Styles.Auth>
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <button onClick={loginHandler}>Log In</button>
      </Card>
    </Styles.Auth>
  );
};

export default Auth;
