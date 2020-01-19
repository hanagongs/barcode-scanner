import { SET_BARCODE_MAP } from '../constants/actionTypes';

function setBarcodeMap(data) {
  return {
    type: SET_BARCODE_MAP,
    payload: data
  };
}

export default setBarcodeMap;
