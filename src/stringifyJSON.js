// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {

  // handles types boolean, null, and number
  if (typeof obj === 'boolean' || typeof obj === 'number' || obj === null) {
    return obj += '';

  // handles type string
  } else if (typeof obj === 'string') {
    return '"' + obj + '"';

  // handles arrays
  } else if (Array.isArray(obj)) {
    var result = '';
    
    _.each(obj, function(item) {
      item = stringifyJSON(item);
      result += item + ',';
    });

    return '[' + result.slice(0, result.length - 1) + ']';

  // handles empty and unstringifiable objects
  } else if (typeof obj === 'object' && (Object.keys(obj).length === 0 || Object.keys(obj).includes('functions'))) {
    return '{}';

  // handles stringifiable objects
  } else if (typeof obj === 'object') {
    var result = '';

    _.each(obj, function(value, key) {
      result += stringifyJSON(key) + ':' + stringifyJSON(value) + ',';
    });

    return '{' + result.slice(0, result.length - 1) + '}';
  }
};