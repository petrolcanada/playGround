const request = require('request');
const fs = require('fs');
const http = require("http");


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
        resolve({
          symbol,
          data: JSON.parse(res.body)
        });
      }
    })
  })
};

async function tickerIterater() {
  const symbol = await getSymbol();
  let orderBookPromises = []

  for (const key in symbol){
    if (symbol[key] == 'btcusd' || symbol[key] == 'ltcusd' || symbol[key] == 'ethusd'){
      orderBookPromises.push(getOrderBook(symbol[key]))
    }
    // if (symbol[key] == 'btcusd') {
    //   // console.log(key + "->" + symbol[key],"  ", ticker, "  ",orderBook);
    //   // console.log(key + "->" + symbol[key],"  ",await getTicker(symbol[key]));
    // };
  };

  const orderBooks = await Promise.all(orderBookPromises)
  // console.log('orderBooks', orderBooks)

  const bidAskStates = []

  orderBooks.map((v, i) => {
    const orderBook = v.data
    var orderBookBid = orderBook["bids"];
    var orderBookAsk = orderBook["asks"];
    orderBookBid.forEach(element => {
      element["source"] = "bitfinex";
    });
    orderBookAsk.forEach(element => {
      element["source"] = "bitfinex";
    });
    var sumAmountBid = 0;
    var maxPriceBid = parseFloat(orderBookBid[0]["price"]);
    var minPriceBid = parseFloat(orderBookBid[orderBookBid.length - 1]["price"]);
    orderBookBid.forEach(element => {
      sumAmountBid = sumAmountBid + parseFloat(element["amount"]);
    });
    var sumAmountAsk = 0;
    var maxPriceAsk = parseFloat(orderBookAsk[orderBookAsk.length - 1]["price"]);
    var minPriceAsk = parseFloat(orderBookAsk[0]["price"]);
    orderBookAsk.forEach(element => {
      sumAmountAsk = sumAmountAsk + parseFloat(element["amount"]);
    });
    const bidState = v.symbol + " Bid:" + minPriceBid + "~" + maxPriceBid + " amt: " + sumAmountBid + "\n"
    const askState = v.symbol + " Ask:" + minPriceAsk + "~" + maxPriceAsk + " amt: " + sumAmountAsk + "\n"
    bidAskStates.push(bidState, askState)
  })

  const app = http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // res.write(bidState + askState);
    res.write("this is bid and ask: "+bidAskStates);
    res.end();
  }).listen(2000);
  console.log(typeof bidAskStates);
  console.log("please log in to http://localhost:2000")

};

tickerIterater();
