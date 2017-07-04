// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

const stringifyJSON = (obj) => {

  switch(checkType(obj)) {
    case 'boolean':
    case 'number':
    case 'null':
      return obj += '';
      break;
    case 'string':
      return `"${obj}"`;
      break;
    case 'unstring':
      return '{}';
      break;
    case 'array':
      return `[${obj.map((item) => {
        return stringifyJSON(item);
      }).join(',')}]`;
      break;
    case 'object':
      let results = [];
      _.each(obj, function(value, key) {
        results.push(`${stringifyJSON(key)}:${stringifyJSON(value)}`);
      });
      return `{${results.join(',')}}`
  }
};


const checkType = (obj) => {
  let type = typeof obj;

  if (typeof obj === 'boolean') {
    type = 'boolean';
  } else if (typeof obj === 'number') {
    type = 'number';
  } else if (obj === null) { 
    type = 'null';
  } else if (typeof obj === 'string') { 
    type = 'string'; 
  } else if (Array.isArray(obj)) { 
    type = 'array';
  } else {
    type = 'object';
    let keys = Object.keys(obj);
    if (!keys.length || keys.includes('functions')) {
      type = 'unstring';
    }
  }

  return type;
};

