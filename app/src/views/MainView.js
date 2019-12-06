import React from 'react';
import styled from 'styled-components';
import Quagga from 'quagga';

import mockData from './mock_data.json';
import './styles.css';
import { Scanner } from '../components/Scanner/index.js';

// var _scannerIsRunning = false;

// const startScanner = () => {
//   Quagga.init(
//     {
//       inputStream: {
//         name: 'Live',
//         type: 'LiveStream',
//         target: document.querySelector('#scanner-container'),
//         constraints: {
//           width: 480,
//           height: 320,
//           facingMode: 'environment'
//         }
//       },
//       decoder: {
//         readers: [
//           'code_128_reader',
//           'ean_reader',
//           'ean_8_reader',
//           'code_39_reader',
//           'code_39_vin_reader',
//           'codabar_reader',
//           'upc_reader',
//           'upc_e_reader',
//           'i2of5_reader'
//         ],
//         debug: {
//           showCanvas: true,
//           showPatches: true,
//           showFoundPatches: true,
//           showSkeleton: true,
//           showLabels: true,
//           showPatchLabels: true,
//           showRemainingPatchLabels: true,
//           boxFromPatches: {
//             showTransformed: true,
//             showTransformedBox: true,
//             showBB: true
//           }
//         }
//       }
//     },
//     function(err) {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       console.log('Initialization finished. Ready to start');
//       Quagga.start();

//       // Set flag to is running
//       _scannerIsRunning = true;
//     }
//   );
//   Quagga.onProcessed(function(result) {
//     var drawingCtx = Quagga.canvas.ctx.overlay,
//       drawingCanvas = Quagga.canvas.dom.overlay;

//     if (result) {
//       if (result.boxes) {
//         drawingCtx.clearRect(
//           0,
//           0,
//           parseInt(drawingCanvas.getAttribute('width')),
//           parseInt(drawingCanvas.getAttribute('height'))
//         );
//         result.boxes
//           .filter(function(box) {
//             return box !== result.box;
//           })
//           .forEach(function(box) {
//             Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
//               color: 'green',
//               lineWidth: 2
//             });
//           });
//       }

//       if (result.box) {
//         Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
//           color: '#00F',
//           lineWidth: 2
//         });
//       }

//       if (result.codeResult && result.codeResult.code) {
//         Quagga.ImageDebug.drawPath(
//           result.line,
//           { x: 'x', y: 'y' },
//           drawingCtx,
//           { color: 'red', lineWidth: 3 }
//         );
//       }
//     }
//   });

//   Quagga.onDetected(function(result) {
//     const barcode = result.codeResult.code;
//     console.log('Barcode detected and processed : [' + barcode + ']');
//     if (barcode in mockData) {
//       Quagga.stop();
//       console.log(
//         `Found a match: ${barcode} is mapped to ${mockData[barcode]}`
//       );
//     }
//   });
// };

// const Button = styled.div`
//   width: 200px;
//   height: 50px;
//   background-color: cyan;
//   display: flex;
//   vertical-align: middle;
//   align-items: center;
//   justify-content: center;
// `;

// const ButtonStop = styled.div`
//   width: 200px;
//   height: 50px;
//   background-color: red;
//   display: flex;
//   vertical-align: middle;
//   align-items: center;
//   justify-content: center;
// `;

// const handleClick = () => {
//   console.log('Clicked');
//   startScanner();
// };

const MainView = () => {
  return (
    <Scanner barcodeMap={mockData} />
    // <React.Fragment>
    //   <p>Suppp</p>
    //   <div id="scanner-container" />
    //   <Button onClick={() => handleClick()}>Start Scanner</Button>
    //   <ButtonStop onClick={() => Quagga.stop()}>Stop Scanner</ButtonStop>
    // </React.Fragment>
  );
};
export default MainView;
