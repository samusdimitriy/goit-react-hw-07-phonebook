import {
  StyledContactsContainer,
  StyledContactItem,
  StyledContactName,
  StyledContactNumber,
  StyledDeleteButton,
  StyledContactsHeading,
  StyledContactsList,
} from './Contacts.styled';
import Notiflix from 'notiflix';
import Filter from 'components/Filter/Filter';
import {
  useDeleteContactMutation,
  useGetContactsQuery,
} from 'redux/contactsSlice';

const Contacts = () => {
  const { data: contacts = [], isLoading, error } = useGetContactsQuery();
  const [handleDeleteContact, { isLoading: isDeleting }] =
    useDeleteContactMutation();

  const handleDeleteClick = async id => {
    try {
      await handleDeleteContact(id).unwrap();

      Notiflix.Notify.success('Contact successfully deleted');
    } catch (error) {
      Notiflix.Notify.failure('Failed to delete contact: ' + error.message);
    }
  };

  return (
    <>
      <StyledContactsHeading>Contacts</StyledContactsHeading>
      <Filter />
      {isLoading && <p>Loading...</p>}
      {error && (
        <p>
          Something went wrong. Please try again later. Error: {error.message}
        </p>
      )}
      {contacts.length < 1 ? (
        <p>Your Phonebook is empty. Please add a contact.</p>
      ) : (
        <StyledContactsContainer>
          <StyledContactsList>
            {contacts.map(contact => (
              <StyledContactItem key={contact.id}>
                <StyledContactName>{contact.name}:</StyledContactName>
                <StyledContactNumber>{contact.phone}</StyledContactNumber>
                <StyledDeleteButton
                  type="button"
                  onClick={() => handleDeleteClick(contact.id)}
                  disabled={isDeleting}
                >
                  Delete
                </StyledDeleteButton>
              </StyledContactItem>
            ))}
          </StyledContactsList>
        </StyledContactsContainer>
      )}
    </>
  );
};

export default Contacts;
