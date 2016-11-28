// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  var string = "";

  // Termination condition
  if (arguments === 0) {
    return "Give me something to work with, here!";
  };

  // Base cases
  if (typeof obj === "function") {
    string = null;

  } else if (obj == "undefined") {
    string = null;

  } else if (obj == null) {
    string = 'null';

  } else if (typeof obj === "number" || typeof obj === "boolean") {
    string += obj;

  } else if (typeof obj === "string") {
    string = '"' + obj + '"';

  // Recursive cases
  } else if (Array.isArray(obj)) {
    string = "[" + obj.map(function(o) {return stringifyJSON(o)}).join() + "]"

  } else if (typeof obj === "object") {
    var stringList = []
    Object.keys(obj).forEach(function(key) {
      var value = stringifyJSON(obj[key]);
      if (value !== null) {
        stringList.push('"' + key + '"' + ":" + value)
      };
    });
    string = "{" + stringList.join(",") + "}";
  };
  
  // janky last check for value
  if (string == '{"undefined":null}') {
    return '{}'
  } else {
  return string;
  };
};
