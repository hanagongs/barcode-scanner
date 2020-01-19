# barcode-scanner

## Overview
This is a bare-bones app for a very specific use case.

This app pulls a mapping of barcodes to another value from a *published* Google Sheet. When using the barcode scanner, if your barcode is in the Google Sheet mapping, the value associated with it is returned.

The barcode scanner utilizes [QuaggaJS](https://serratus.github.io/quaggaJS/).

## Usage
- Create a Google Spreadsheet with your barcodes and associated values, and [publish it](https://support.google.com/docs/answer/183965?co=GENIE.Platform%3DDesktop&hl=en). (**Doing so makes the spreadsheet public, DO NOT USE THIS WITH SENSITIVE DATA**)
- Update the Barcode Map URL [here](https://github.com/hanaquadara/barcode-scanner/blob/master/app/src/services/fetchBarcodeData.js#L4)

- Click `Start Scanning`
- Allow usage of your device's camera
- Center your barcode within the viewport for the scanner to read

or

- Click `Show Barcode Map` to view all barcodes and their associates values that are available in the Google Sheet

## Development
- You will need a device with a camera to test on
- Node and [npm](https://www.npmjs.com/get-npm)

Start the app with:
```
cd app/
npm i
npm start
```
