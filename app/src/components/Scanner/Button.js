import styled from 'styled-components';

const Button = styled.div`
  width: 200px;
  height: 50px;

  display: flex;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  letter-spacing: 0.05em;
  background-color: #707070;
  color: white;
  box-shadow: 5px 10px;
  border-radius: 25px;

  &:active {
    background-color: black;
  }
`;

export default Button;
