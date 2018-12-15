const request = require('request')
const url = "https://api.bitfinex.com/v1"


function getSymbol(){
  const apiWanted = url + '/symbols'
  return new Promise(function(resolve,reject){
    request.get(apiWanted,function(err,res,body){
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(res.body))
      }
    })
  })
};

function getTicker(symbol){
  const apiWanted = url + '/pubticker/' + symbol
  return new Promise(function(resolve,reject){
    request.get(apiWanted,function(err,res){
      if(err){
        reject(err);
      }else{
        resolve(JSON.parse(res.body));
      }
    })
  })
};



async function tickerIterater() {
  const symbol = await getSymbol();
  console.log(typeof symbol)
  for (const key in symbol){
    if (symbol[key] == 'btcusd' ){
      const ticker = await getTicker(symbol[key])
      console.log(key + "->" + symbol[key],"  ", ticker);
    }
  }
  // console.log(tickerRaw);
};

tickerIterater();

// request.get(url + '/symbols',
//   function(error, response, body) {
//     console.log(body);
// })
