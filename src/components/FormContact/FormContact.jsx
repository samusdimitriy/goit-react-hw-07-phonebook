import React from 'react';
import { StyledInput, StyledButton, Title, Form } from './FormContact.styled';
import Notiflix from 'notiflix';
import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'redux/contactsSlice';

const FormContact = () => {
  const { data: items = [], isLoading, error } = useGetContactsQuery();
  const [addContact, { isLoading: isAdding, error: addError }] =
    useAddContactMutation();

  const handleSubmit = async e => {
    e.preventDefault();

    const isContactExist = items.find(
      contact =>
        contact.name.toLowerCase() === e.target.name.value.toLowerCase()
    );
    if (isContactExist) {
      Notiflix.Notify.failure(
        `Contact "${e.target.name.value}" is already in contacts`
      );
      e.target.reset();
      return;
    }

    const newContact = {
      name: e.target.name.value,
      phone: e.target.number.value,
    };

    try {
      await addContact(newContact).unwrap();
      Notiflix.Notify.success('Contact added');
      e.target.reset();
    } catch (error) {
      Notiflix.Notify.failure('Failed to add contact: ' + addError.message);
    }
  };

  return (
    <>
      <Title>Phonebook</Title>
      {isLoading && <p>Loading...</p>}

      {error && <p>Oops, something went wrong. Try again later</p>}
      {items.length > 0 && (
        <Form onSubmit={handleSubmit}>
          <StyledInput
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder="Name"
          />
          <StyledInput
            type="tel"
            name="number"
            pattern="[+]?[\d\s.-]{1,30}"
            title="Phone number must be digits and can contain spaces, dashes, periods, and can start with +"
            required
            placeholder="Number"
          />
          <StyledButton type="submit" disabled={isAdding}>
            Add contact
          </StyledButton>
        </Form>
      )}
    </>
  );
};

export default FormContact;
