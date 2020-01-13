const URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQbZts4uizqpXqLlEThKYoo_S5PF0F3ElW62J5TJVZQxS9FVjLJlx8YH3GkDoyBC69EQ7pDIwLEcwEc/pub';

const csvToDict = csvStr => {
  const barcodeMap = {};
  const rows = csvStr.split('\n');
  for (const row of rows) {
    const values = row.split(',');
    barcodeMap[values[0]] = values[1];
  }
  console.log(barcodeMap);
  return barcodeMap;
};

async function fetchBarcodeData() {
  try {
    var request = require('request');

    var options = {
      method: 'GET',
      url: URL,
      qs: { output: 'csv' }
    };

    request(options, function(error, response, body) {
      if (error) throw new Error(error);
      return csvToDict(body);
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default fetchBarcodeData;
