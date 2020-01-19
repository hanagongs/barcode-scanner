import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Quagga from 'quagga';

import Button from './Button';
import './styles.css';

const ScannerWrapper = styled.div`
  width: 100%;
  margin-top: 20%;
  margin-bottom: 20px;

  postition: relative;
  display: flex;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: block;
  width: 100%;
  margin-top: 50px;
`;

const Text = styled.div`
  margin-top: 20px;
  text-align: center;
`;

class Scanner extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isScannerRunning: false, barcode: null };
    this.initializeScanner = this.initializeScanner.bind(this);
    this.getBarcodeResult = this.getBarcodeResult.bind(this);
  }

  initializeScanner() {
    const barcodeMap = this.props.barcodeMap;
    const startScanner = () => {
      this.setState({ barcode: null });
      Quagga.start();
      this.setState({ isScannerRunning: true });
    };
    const stopScanner = barcode => {
      Quagga.stop();
      this.setState({
        isScannerRunning: false,
        barcode: barcode,
        barcodeValue: barcodeMap[barcode]
      });
    };
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#scanner-container'),
          constraints: {
            width: 480,
            height: 320,
            facingMode: 'environment'
          }
        },
        decoder: {
          readers: [
            'code_128_reader',
            'ean_reader',
            'ean_8_reader',
            'code_39_reader',
            'code_39_vin_reader',
            'codabar_reader',
            'upc_reader',
            'upc_e_reader',
            'i2of5_reader'
          ]
        }
      },
      function(err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log('Initialization finished. Ready to start');
        startScanner();
      }
    );

    Quagga.onProcessed(function(result) {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute('width')),
            parseInt(drawingCanvas.getAttribute('height'))
          );
          result.boxes
            .filter(function(box) {
              return box !== result.box;
            })
            .forEach(function(box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: 'green',
                lineWidth: 2
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: '#00F',
            lineWidth: 2
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: 'x', y: 'y' },
            drawingCtx,
            { color: 'red', lineWidth: 3 }
          );
        }
      }
    });

    Quagga.onDetected(function(result) {
      const barcode = result.codeResult.code;
      console.log('Barcode detected and processed : [' + barcode + ']');
      if (barcode in barcodeMap) {
        const barcodeValue = barcodeMap[barcode];
        console.log(`Found a match: ${barcode} is mapped to ${barcodeValue}`);
        stopScanner(barcode);
      }
    });
  }

  getBarcodeResult(barcode) {
    const barcodeMap = this.props.barcodeMap;
    if (Object.keys(barcodeMap).includes(barcode))
      return `Barcode: ${barcode} | Value: ${barcodeMap[barcode]}`;
    return `Couldn't find mapping for barcode: ${barcode}, please check spreadsheet.`;
  }

  render() {
    const isScannerRunning = this.state.isScannerRunning;
    const barcode = this.state.barcode;
    return (
      <React.Fragment>
        <ScannerWrapper id="scanner-container" />
        {!isScannerRunning && (
          <ButtonWrapper>
            <Button onClick={() => this.initializeScanner()}>
              Start Scanner
            </Button>
          </ButtonWrapper>
        )}
        {barcode && <Text>{this.getBarcodeResult(barcode)}</Text>}
        {isScannerRunning && !barcode && <Text>Scan a barcode</Text>}
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

const mapStateToProps = state => {
  return { barcodeMap: state.barcodes.barcodeMap };
};

export default connect(mapStateToProps)(Scanner);
