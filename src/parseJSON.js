// Note: The active code is Wesley Tsai's, http://wesleytsai.io/2015/06/13/a-json-parser/
// I got through the getElementsByClassName and stringifyJSON portions but had real trouble with the parser
// in the amount of time I had remainng, and I decided to try to learn from code that works.
// My initial thoughts and snippets of code I hoped to use are commented out at the bottom.
// Hoping to keep working on this for the next two weeks before the bootcamp begins.


function parseJSON(json) {
  var at, // current index of JSON text
      ch; // character at current index

  var next = function() {
    // increments at
    // updates ch
    at += 1;
    ch = json.charAt(at); // json is the JSON text passed into our parser
    return ch;
  };

  var error = function(message) { // throw error for bad syntax
    throw undefined;
  };

  var value = function () {
    switch(ch) {
      case '{':
        return object();
      case '[':
        return array();
      case '\"':
        return string();
      case 't':
      case 'f':
        return bool();
      case 'n':
        return nully();
      default:
        if(ch === '-' || (ch && ch >= 0 && ch <= 9)) { // number
          return number();
        } else {
          error('bad JSON');
        }
        break;
    }
  };

  var nully = function() {
    // ch is at 'n', verify and return null
    var nully = '';
    if(ch === 'n') {
      _.times(4, function() {
        nully += ch;
        next();
      });
      if(nully === 'null') {
        return null;
      } else {
        error('bad null');
      }
    }

    error('bad null');
  };

  var bool = function() {
    // ch is at 't' of 'f', verify & return the boolean
    var bool = '';
    if(ch === 't') {
      _.times(4, function() {
        bool += ch;
        next();
      });
      if(bool === 'true') {
        return true;
      } else {
        error('bad bool');
      }
    } else if(ch === 'f') {
      _.times(5, function() {
        bool += ch;
        next();
      });
      if(bool === 'false') {
        return false;
      } else {
        error('bad bool');
      }
    }

    error('bad bool');
  };

  var number = function() {
    // ch is at negative sign '-' or digit 0-9, create & return the number
    var number = ''; // create string and then use Number() to convert
    function getDigits() { // collect consecutive digits until non-digit is reached
      while(ch && ch >= 0 && ch <= 9) { // need to avoid empty strings
        number += ch;
        next();
      }
    }

    // optional - get neg sign
    if(ch === '-') {
      number += ch;
      next();
    }

    getDigits();

    // optional - get decimal point
    if(ch === '.') {
      number += ch;
      next();
      getDigits();
    }

    // optional - get exponential
    if(ch === 'e' || ch === 'E') {
      number += ch;
      next();
      // required - get sign of exponent
      if(ch === '-' || ch === '+') {
        number += ch;
        next();
      }
      getDigits(); // exponent
    }

    if(!isNaN(Number(number))) { // check if string can be converted to number
      return Number(number);
    } else { // string could not be converted to number
      error('bad number');
    }
  };

  var escapes = { // helper variable
    'b': '\b',
    'n': '\n',
    't': '\t',
    'r': '\r',
    'f': '\f',
    '\"': '\"',
    '\\': '\\'
  };

  var string = function() {
    // ch is at opening quote, create & return the string
    var string = '';
    if(ch !== '\"') error('string should start with \"');
    next();
    while(ch) {
      // watch for end of string
      if(ch === '\"') {
        next();
        return string;
      }

      // watch for escapes
      if(ch === '\\') {
        next();
        if(escapes.hasOwnProperty(ch)) {
          string += escapes[ch];
        } else {
          // if not a proper escape code, ignore escape and just add char
          // NOTE: this should never be called if proper stringified JSON provided
          string += ch;
        }
      } else {
        // anything other than \ and " => just add character to string
        string += ch;
      }
      next();
    }
    // reached end without closing quote => error
    error('bad string');
  };

  var array = function() {
    // ch is at opening bracket, create & return the array
    var array = [];
    if(ch !== '[') error('array should start with [');
    if(next() === ']') return array; // empty array

    do {
      array.push(value());
      if(ch === ']') { // array end reached
        next();
        return array;
      }
    } while(ch && ch === ',' && next()); // found ',' => more elements to go

    throw new SyntaxError;
  };

  var object = function() {
    // ch is at opening curley brace, create & return the object
    var object = {};
    if(ch !== '{') error('object should start with {');
    if(next() === '}') return object; // empty object

    do {
      var key = string(); // get key
      if(ch !== ':') error('object property expecting ":"');
      next();
      object[key] = value(); // create property with whatever value is, perhaps another object/array
      if(ch === '}') {  // object end reached
        next();
        return object;
      }
    } while(ch && ch === ',' && next()); // found ',' => more properties to go

    error('bad object');
  };

  at = 0;
  ch = json.charAt(at);
  return value();
};



/* RULES

  Iterate through characters of json argument.

  1. Object: When see { keep iterating until locate }
  2. Array: When see [ keep iterating until locate ]
  3. String: When see " keep iterating until locate "
  4. Double string (?): When see ' keep iterating until locate '
  5. Number: When see a number, keep iterating until locate something that's not a
      . (dot) or a - (hyphen) or another number
  6. Boolean / null: When see letters that start true, false, or null, keep checking for next letters?
  7. - : When see negative / hyphen, check what's after it. If number, it's part of a number. If letter,
      it's part of a string (one string example in tests).
  8. Escape characters: Skip over these when iterating? like white space?
  9. End of unit characters: " " (space), "," (comma) signal the end of a unit WHEN THEY'RE NOT IN A STRING
  10. Unparseable strings: Check for these and return them untouched? Or throw an error?
  11. Other special characters?

  RULES */


/*var parseJSON = function(json) {
  console.log("arguments length = " + arguments.length)
  console.log("json = " + json);
  console.log("type = " + typeof json)

  /*unparseableStrings = [
    '["foo", "bar"',
    '["foo", "bar\\"]'
  ];

  // Characters that the function can recognize as the end of a unit (if they aren't in a string)
  var endings = [" ", ","]

  // Escape characters
  var escapee = {
      "\"": "\"",
      "\\": "\\",
      "/": "/",
      b: "\b",
      f: "\f",
      n: "\n",
      r: "\r",
      t: "\t"
  };

  // Booleans and null
  var keyword = function () {

      switch (ch) {
      case "t":
          next("t");
          next("r");
          next("u");
          next("e");
          return true;
      case "f":
          next("f");
          next("a");
          next("l");
          next("s");
          next("e");
          return false;
      case "n":
          next("n");
          next("u");
          next("l");
          next("l");
          return null;
      }
      error("Unexpected '" + ch + "'");
  };

  // Check for unparseable strings
  if (json == unparseableStrings[0]) {
    console.log("returned = " + unparseableStrings[0]);
    return '{' + unparseableStrings[0] + '}';
  }

  if (json == unparseableStrings[1]) {
    console.log("returned = " + unparseableStrings[1]);
    return '{' + unparseableStrings[1] + '}';
  };

  // Termination condition
  if (arguments === 0) {
    return "I need something to eat!";
  };

  // Error conditions
  if (json == 'undefined' || typeof json == 'function') {
    throw new SyntaxError;
  }

  // Base cases

  //// so many.

  // Recursive cases
    // when there is a nested object, feed it back into the parseJSON function
      // if it starts with [ and gets to another { or [ before the closing part
      // or if it starts with { and gets to another { or [ before the closing part
        // send that part (everything from the next opening mark onward) through parseJSON again
        for (var i = 0; i < split.length; i++) {
          // anytime there is a nested object, feed it back into the parseJSON function
        }
  // return JSON object
};*/
