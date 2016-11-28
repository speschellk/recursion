// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {

  var elements = document.querySelectorAll(".targetClassName");

  //recursive function that iterates over each text node in the dom
      //termination condition
      if (className = undefined) {
        return "Please enter a class name to search for.";

      // base case
      } else if  {
        // done searching through document, stop

      //recursive case
      } else {
        getElementsByClassName('something smaller')
      };

  return elements;
};
