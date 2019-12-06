import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Quagga from 'quagga';

import Button from './Button';

class Scanner extends React.PureComponent {
  constructor(props) {
    super(props);
    const { barcodeMap } = this.props;
    this.state = { isScannerRunning: false };

    this.startScanner = this.startScanner.bind(this);
    this.stopScanner = this.stopScanner.bind(this);
    this.initializeScanner = this.initializeScanner.bind(this);
  }

  startScanner() {
    this.initializeScanner();

    Quagga.start();
    this.setState({ isScannerRunning: true });
  }

  stopScanner() {
    Quagga.stop();
    this.setState({ isScannerRunning: false });
  }

  initializeScanner() {
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
      if (barcode in this.barcodeMap) {
        console.log(
          `Found a match: ${barcode} is mapped to ${this.barcodeMap[barcode]}`
        );
        this.stopScanner();
      }
    });
  }

  render() {
    console.log(this.isScannerRunning);
    return (
      <React.Fragment>
        {this.isScannerRunning ? (
          <div id="scanner-container" />
        ) : (
          <Button onClick={() => this.startScanner()}>Start Scanner</Button>
        )}
      </React.Fragment>
    );
  }
}

Scanner.propTypes = {
  isScannerRunning: PropTypes.bool.isRequired,
  barcodeMap: PropTypes.object
};

Scanner.defaultProps = {
  barcodeMap: {}
};

const mapStateToProps = state => ({
  isScannerRunning: state.isScannerRunning || false
});

export default connect(mapStateToProps, null)(Scanner);
