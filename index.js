'use strict';

var appendType = require('append-type');

function createFeintFunction(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function, but got ' + appendType(fn) + '.');
  }

  var called = false;

  return function feint() {
    if (!called) {
      called = true;
      return;
    }

    return fn.apply(this, arguments);
  };
}

module.exports = createFeintFunction;
