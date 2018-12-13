const request = require('request')
const url = "https://api.bitfinex.com/v1"


function getTicker(apiWanted){
  return new Promise(function(resolve,reject){
    request.get(apiWanted,function(err,res,body){
      if (err) {
        reject(err);
      } else {
<<<<<<< HEAD
        resolve(res.body)
=======
        resolve(JSON.parse(body));
>>>>>>> bb64ca13c257531d2c9b3123a9e3f43b15bcff45
      }
    })
  })
};


<<<<<<< HEAD
async function tickerIterater(apiWanted) {
  const tickerRaw = await getTicker(apiWanted);
  const tickerJSON = JSON.parse(tickerRaw)
  console.log(typeof tickerRaw,typeof tickerJSON )
  for (const key in tickerJSON){
    console.log(key + "->" + tickerJSON[key]);
  }
  // console.log(tickerRaw);
};
=======
// async function dataToJSON(apiWanted) {
//   const ticker = await getTicker(apiWanted);
//   const tickerJSON = await ticker.json();
//   console.log(ticker);
// };
>>>>>>> bb64ca13c257531d2c9b3123a9e3f43b15bcff45

tickerIterater(url + '/symbols');

// request.get(url + '/symbols',
//   function(error, response, body) {
//     console.log(body);
// })
