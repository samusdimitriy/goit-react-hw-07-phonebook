import React, { useEffect } from 'react';
import {
  StyledContactsContainer,
  StyledContactItem,
  StyledContactName,
  StyledContactNumber,
  StyledDeleteButton,
  StyledContactsHeading,
} from './Contacts.styled';
import { useDispatch, useSelector } from 'react-redux';
import Notiflix from 'notiflix';
import { deleteContactThunk, getContactsThunk } from 'store/contacts/thunk';
import { selectVisibleContacts } from 'store/selectors';

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectVisibleContacts);

  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);

  const handleDeleteContact = id => {
    dispatch(deleteContactThunk(id));
    Notiflix.Notify.success(
      `Contact "${
        contacts.find(contact => contact.id === id).name
      }" successfully deleted`
    );
  };

  return (
    <>
      <StyledContactsHeading>Contacts</StyledContactsHeading>
      <StyledContactsContainer>
        <ul>
          {contacts.map(contact => (
            <StyledContactItem key={contact.id}>
              <StyledContactName>{contact.name}:</StyledContactName>
              <StyledContactNumber>{contact.phone}</StyledContactNumber>
              <StyledDeleteButton
                type="button"
                onClick={() => handleDeleteContact(contact.id)}
              >
                Delete
              </StyledDeleteButton>
            </StyledContactItem>
          ))}
        </ul>
      </StyledContactsContainer>
      {contacts.length < 1 && (
        <p>Your Phonebook is empty. Please add a contact.</p>
      )}
    </>
  );
};

export default Contacts;