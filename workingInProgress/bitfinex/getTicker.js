const request = require('request');
const fs = require('fs');

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

function getTicker(symbol,callback){
  const apiWanted = url + '/pubticker/' + symbol
  return new Promise(function(resolve,reject){
    request.get(apiWanted,function(err,res){
      if(err){
        reject(err);
      }else{
        resolve(JSON.parse(res.body));
        // console.log(JSON.parse(res.body));
      }
    })
  })
};



function getOrderBook(symbol){
  const apiWanted = url + '/book/' + symbol;
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
  console.log(typeof symbol);
  for (const key in symbol){
    if (symbol[key] == 'btcusd' ){
      const ticker = await getTicker(symbol[key]);
      var orderBook = await getOrderBook(symbol[key]);
      // console.log(key + "->" + symbol[key],"  ", ticker, "  ",orderBook);
      // console.log(key + "->" + symbol[key],"  ",await getTicker(symbol[key]));
    };
  };
  var orderBookBid = orderBook["bids"];
  console.log(orderBookBid);
};

tickerIterater();