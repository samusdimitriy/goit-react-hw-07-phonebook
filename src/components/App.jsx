import React from 'react';
import Contacts from './Contacts/Contacts';
import { AppContainer } from './App.styled';
import FormContact from './FormContact/FormContact';

const App = () => {
  return (
    <AppContainer>
      <FormContact />
      <Contacts />
    </AppContainer>
  );
};

export default App;
