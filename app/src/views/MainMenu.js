import React from 'react';
import styled from 'styled-components';

import mockData from './mock_data.json';
import './styles.css';
import { Scanner, Map } from '../components/Scanner';
import fetchBarcodeData from '../services/fetchBarcodeData';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  font-family: Arial;
  font-weight: bold;
`;

const MainMenu = () => {
  const barcodeMap = fetchBarcodeData();
  console.log(barcodeMap);
  return (
    <Wrapper>
      <Scanner barcodeMap={barcodeMap} />
      <Map barcodeMap={barcodeMap} />
    </Wrapper>
  );
};
export default MainMenu;
