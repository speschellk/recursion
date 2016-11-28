// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  var string = "";
  console.log("original obj = " + obj)

  // termination condition
  if (arguments === 0) {
    return "Give me something to work with, here!";
  };

  //Base cases
  if (typeof obj === "function") {
    string = null;

  } else if (obj == undefined) {
    string = 'null';

  } else if (/*obj == undefined || */obj == null || (Object.keys(obj).length === 0 && typeof obj !== "object")) {
    console.log("Base case")
    string += obj;
    console.log("string = " + string);

  } else if (typeof obj === "string") {
    console.log("String case")
    string = '"' + obj + '"';
    console.log("string = " + string)

  // Recursive cases
  } else if (Array.isArray(obj)) {
    console.log("Array case")
    string = "[" + obj.map(function(o) {return stringifyJSON(o)}).join() + "]"
    console.log("string = " + string)

  } else if (typeof obj === "object") {
    console.log("Object case")
    var result = []
    Object.keys(obj).forEach(function(key) {
      var val = stringifyJSON(obj[key])
      if (val !== null) {
        result.push('"' + key + '"' + ":" + val)
      };
    });
    string = "{" + result.join(",") + "}";
  };
  console.log("returned = " + string)
  return string;
};

/*var string = "";
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
};*/
