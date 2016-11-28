// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, parent, elements) {
  if (parent == undefined) {
    parent = document.body;
  };
  if (elements == undefined) {
    elements = [];
  };
  // termination condition
  if (arguments === 0) {
    return "Please supply a class name to search for."
  }
  // base case
  if (parent.classList.contains(className)) {
    elements.push(parent);
  }
  // recursive case
  for(var i = 0; i < parent.children.length; i++) {
    elements.concat(getElementsByClassName(className, parent.children[i], elements));
  }
  return elements;
};
