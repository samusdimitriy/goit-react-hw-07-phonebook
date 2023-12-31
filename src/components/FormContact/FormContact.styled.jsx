import styled from 'styled-components';

export const Form = styled.form`
  max-width: 100%;
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  padding: 40px;
`;

export const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

export const StyledInput = styled.input`
  padding: 5px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  min-width: 300px;
  margin-bottom: 20px;
`;

export const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

export const StyledButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
