const request = require('request')
const url = "https://api.bitfinex.com/v1"


function getTicker(apiWanted){
  return new Promise(function(resolve,reject){
    request.get(apiWanted,function(err,res,body){
      if (err) {
        reject(err);
      } else {
        resolve(body)
      }
    })
  })
};


async function getTicker(apiWanted) {
  const ticker = await request.get(apiWanted);
  const tickerJSON = await ticker.json();
  console.log(ticker);
};

getTicker(url + '/symbols');

// request.get(url + '/symbols',
//   function(error, response, body) {
//     console.log(body);
// })
