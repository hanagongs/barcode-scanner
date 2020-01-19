import React from 'react';
import styled from 'styled-components';

// Needed for styling the barcode scanner
import './styles.css';

import { Scanner, BarcodeMap } from '../components/Scanner';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  font-family: Arial;
  font-weight: bold;
`;

const MainMenu = () => {
  return (
    <Wrapper>
      <Scanner />
      <BarcodeMap />
    </Wrapper>
  );
};
export default MainMenu;
