// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

const stringifyJSON = (obj) => {
  if (typeof obj === 'boolean' || typeof obj === 'number' || obj === null) { 
    return stringifyPrimitive(obj);
  } else if (typeof obj === 'string') {
    return stringifyString(obj);
  } else if (Array.isArray(obj)) {
    return stringifyArray(obj);
  } else if (!Object.keys(obj).length || Object.keys(obj).includes('functions')) {
    return '{}';
  } else {
    return stringifyObject(obj);
  }
};


const stringifyPrimitive = (prim) => {
  return prim += '';
};

const stringifyString = (str) => {
  return `"${str}"`;
}

const stringifyArray = (array) => {
  return `[${array.map((item) => {
    return stringifyJSON(item);
  }).join(',')}]`;
};

const stringifyObject = (obj) => {
  let results = [];
  _.each(obj, (value, key) => {
    results.push(`${stringifyJSON(key)}:${stringifyJSON(value)}`);
  });

  return `{${results.join(',')}}`
};

