import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from './Button';
import './styles.css';

const ButtonWrapper = styled.div`
  display: block;
  width: 100%;
  margin-top: 20px;
`;

const Text = styled.div`
  margin-top: 20px;
  color: red;
  text-align: center;
`;

class Scanner extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { showMap: false };
    this.clickHandler = this.clickHandler.bind(this);
    this.getMapButtonText = this.getMapButtonText.bind(this);
  }

  clickHandler() {
    this.setState({ showMap: !this.state.showMap });
  }

  getMapButtonText() {
    if (!this.state.showMap) return 'Show';
    return 'Hide';
  }

  render() {
    const barcodeMap = this.props.barcodeMap;
    const showMap = this.state.showMap;
    return (
      <React.Fragment>
        <ButtonWrapper>
          <Button
            onClick={() => this.clickHandler()}
          >{`${this.getMapButtonText()} Map`}</Button>
        </ButtonWrapper>

        {showMap &&
          Object.keys(barcodeMap).map(barcode => (
            <Text
              key={`key-${barcode}`}
            >{`${barcode} | ${barcodeMap[barcode]}`}</Text>
          ))}
      </React.Fragment>
    );
  }
}

Scanner.propTypes = {
  barcodeMap: PropTypes.object
};

Scanner.defaultProps = {
  barcodeMap: {}
};

export default Scanner;
