import React from 'react';
import styled from 'styled-components';

import mockData from './mock_data.json';
import './styles.css';
import { Scanner } from '../components/Scanner';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  font-family: Arial;
  font-weight: bold;
`;

const MainView = () => {
  return (
    <Wrapper>
      <Scanner barcodeMap={mockData} />
    </Wrapper>
  );
};
export default MainView;
