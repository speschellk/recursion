// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = (className, parent, elements) => {
  parent = parent || document.body;
  elements = elements || [];

  // base case
  if (parent.classList.contains(className)) {
    elements.push(parent);
  }

  // recursive case
  _.each(parent.children, (child) => {
    elements.concat(getElementsByClassName(className, child, elements));
  });

  return elements;
};
