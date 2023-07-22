import React from 'react';
import Contacts from './Contacts/Contacts';
import { AppContainer } from './App.styled';
import Filter from './Filter/Filter';
import FormContact from './FormContact/FormContact';

const App = () => {
  return (
    <AppContainer>
      <FormContact />
      <Filter />
      <Contacts />
    </AppContainer>
  );
};

export default App;
