const URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQbZts4uizqpXqLlEThKYoo_S5PF0F3ElW62J5TJVZQxS9FVjLJlx8YH3GkDoyBC69EQ7pDIwLEcwEc/pub';

async function fetchBarcodeData(store) {
  try {
    var request = require('request');

    var options = {
      method: 'GET',
      url: URL,
      qs: { output: 'csv' }
    };

    let csv;
    request(options, function(error, response, body) {
      if (error) throw new Error(error);

      csv = body;
      console.log(csv);
      // csv to json
      // return json
      return csv;
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default fetchBarcodeData;
