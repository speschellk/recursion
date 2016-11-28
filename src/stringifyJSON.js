// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  /*console.log("arguments = " + arguments.length)
  console.log("object = " + obj);
  console.log("type = " + typeof obj)
  var string = "";
  // termination condition
  if (arguments == 0) {
    return "Give me something to work with, here.";
  };
  // base case
  if (typeof obj == "string" || typeof obj == "number" || typeof obj == undefined || typeof obj == null) {
  //if (!(key in obj)) {
  //if (!obj.hasOwnProperty(obj)) {
    string = String(obj);
    console.log("Base case = " + string);

  }
  /*if (obj.hasOwnProperty(obj)) {
    for (var key in obj) {
      string += stringifyJSON(obj[key]);
    };
  };
  return string;*/
var string = "";
if (arguments.length === 0) {
    return "Give me something to work with";
} else if (typeof obj === "undefined") {
    string += "undefined";
    console.log(obj)
    console.log(string)
} else if (obj === null) {
    string += "null";
    console.log(obj)
    console.log(string)
} else if (obj === false) {
    string += "false";
    console.log(obj)
    console.log(string)
} else if (obj === true) {
    string += "true";
    console.log(obj)
    console.log(string)
} else if (typeof obj === "number") {
    string += obj;
    console.log("number " + obj)
    console.log(string)
} else if (typeof obj === "string" && obj.split.length == 1) {
    string += obj;
    console.log("string " + obj)
    console.log(string)
} else if (typeof obj === "string" && obj.split.length > 1) {
    var split = obj.split();
    console.log(split)
    for (var key in split) {
      string = string.concat(split[key]);
      console.log(string);
    }

} else {
    for (var key in obj) {
      console.log("keys " + obj)
      console.log(string)
      string += stringifyJSON(obj[key]);
    };
  };
  return string;
};
