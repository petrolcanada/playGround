const request = require('request')
const url = "https://api.bitfinex.com/v1"


function getTicker(apiWanted){
  return new Promise(function(resolve,reject){
    request.get(apiWanted,function(err,res,body){
      if (err) {
        reject(err);
      } else {
        resolve(res.body)
      }
    })
  })
};


async function tickerIterater(apiWanted) {
  const tickerRaw = await getTicker(apiWanted);
  const tickerJSON = JSON.parse(tickerRaw)
  console.log(typeof tickerRaw,typeof tickerJSON )
  for (const key in tickerJSON){
    console.log(key + "->" + tickerJSON[key]);
  }
  // console.log(tickerRaw);
};

tickerIterater(url + '/symbols');

// request.get(url + '/symbols',
//   function(error, response, body) {
//     console.log(body);
// })
