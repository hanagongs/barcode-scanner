import React from 'react';
import { connect } from 'react-redux';
import Quagga from 'quagga';

class Scanner extends React.Component {
  constructor() {
    super();
    this.state = { isScannerRunning: false };

    this.startScanner = this.startScanner.bind(this);
    this.stopScanner = this.stopScanner.bind(this);
    this.initializeScanner = this.initializeScanner.bind(this);
  }

  startScanner() {
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
        this.startScanner();
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
      if (barcode in mockData) {
        console.log(
          `Found a match: ${barcode} is mapped to ${mockData[barcode]}`
        );
        this.stopScanner();
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <div id="scanner-container" />
      </React.Fragment>
    );
  }
}

export default Scanner;
