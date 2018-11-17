const fs = require('fs')

console.log("hello world")

setTimeout(function(){
  console.log("1 second has passed")
}, 1000);

function callFunction(func){
  func();
}

function sayHello(){
  console.log("Hello");
};

sayHello();



callFunction(sayHello)
