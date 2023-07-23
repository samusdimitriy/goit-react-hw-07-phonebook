import React, { useEffect, useState } from 'react';
import {
  StyledFilterContainer,
  StyledFilterInput,
  StyledFilterHeading,
} from './Filter.styled';
import { useGetContactsQuery } from 'redux/contactsSlice';

const Filter = () => {
  const [filterValue, setFilterValue] = useState('');

  const { isLoading, error, refetch } = useGetContactsQuery({
    filter: filterValue,
  });

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      refetch({ filter: filterValue });
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [filterValue, refetch]);

  const handleChange = event => {
    const value = event.target.value;
    setFilterValue(value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error while fetching contacts.</div>;
  }

  return (
    <StyledFilterContainer>
      <StyledFilterHeading>Filter contacts</StyledFilterHeading>
      <StyledFilterInput
        type="text"
        name="filter"
        value={filterValue}
        onChange={handleChange}
      />
    </StyledFilterContainer>
  );
};

export default Filter;
