import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Quagga from 'quagga';

import Button from './Button';
import './styles.css';

const ScannerWrapper = styled.div`
  width: 100%;
  margin-top: 40%;
  margin-bottom: 20px;

  display: flex;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: block;
  width: 100%;
  margin-top: 20px;
`;

class Scanner extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isScannerRunning: false };
    this.initializeScanner = this.initializeScanner.bind(this);
  }

  initializeScanner() {
    const barcodeMap = this.props.barcodeMap;
    const startScanner = () => {
      Quagga.start();
      this.setState({ isScannerRunning: true });
    };
    const stopScanner = () => {
      Quagga.stop();
      this.setState({ isScannerRunning: false });
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
        console.log(
          `Found a match: ${barcode} is mapped to ${barcodeMap[barcode]}`
        );
        stopScanner();
      }
    });
  }

  render() {
    const isScannerRunning = this.state.isScannerRunning;
    console.log(isScannerRunning);
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
