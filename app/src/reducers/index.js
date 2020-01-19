import { combineReducers } from 'redux';
import { SET_BARCODE_MAP } from '../constants/actionTypes';

const barcodes = (state = {}, action) => {
  switch (action.type) {
    case SET_BARCODE_MAP:
      return {
        ...state,
        barcodeMap: action.payload
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  barcodes
});

export default reducer;
