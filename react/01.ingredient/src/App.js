import React, { useContext } from 'react';
import Auth from './components/Auth';
import Ingredients from './components/Ingredients/Ingredients';
import { AuthContext } from './store/authContext';

const App = () => {
  const authContext = useContext(AuthContext)

  let content = <Auth />
  if (authContext.isAuth) {
    content = <Ingredients />
  }

  return content;
};

export default App;
