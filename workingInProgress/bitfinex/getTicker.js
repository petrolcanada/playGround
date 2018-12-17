const request = require('request');
const url = "https://api.bitfinex.com/v1"
const fs = require('fs');

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

function getTicker(symbol,callback){
  const apiWanted = url + '/pubticker/' + symbol
  return new Promise(function(resolve,reject){
    request.get(apiWanted,function(err,res){
      if(err){
        reject(err);
      }else{
        resolve(JSON.parse(res.body));
        console.log(JSON.parse(res.body));
      }
    })
  })
};




async function tickerIterater() {
  const symbol = await getSymbol();
  console.log(typeof symbol)
  for (const key in symbol){
    // if (symbol[key] == 'btcusd' ){
    //   const ticker = await getTicker(symbol[key])
    //   console.log(key + "->" + symbol[key],"  ", ticker);
    //   console.log(key + "->" + symbol[key],"  ",getTicker(symbol[key]));
    // }
    console.log(key);
    fs.writeFile('input.txt')
  }
  // console.log(tickerRaw);
};

tickerIterater();

// getTicker('ltcusd');

// request.get(url + '/symbols',
//   function(error, response, body) {
//     console.log(body);
// })
