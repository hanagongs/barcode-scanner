import React from 'react';
import { connect } from 'react-redux';
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
  text-align: center;
`;

class BarcodeMap extends React.PureComponent {
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
          >{`${this.getMapButtonText()} Barcode Map`}</Button>
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

BarcodeMap.propTypes = {
  barcodeMap: PropTypes.object
};

BarcodeMap.defaultProps = {
  barcodeMap: {}
};

const mapStateToProps = state => {
  return { barcodeMap: state.barcodes.barcodeMap };
};

export default connect(mapStateToProps)(BarcodeMap);
