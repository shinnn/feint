'use strict';

var appendType = require('append-type');

module.exports = function createFeintFunction(fn) {
	if (typeof fn !== 'function') {
		throw new TypeError('Expected a function, but got ' + appendType(fn) + '.');
	}

	var called = false;

	return function feint() {
		if (!called) {
			called = true;
			return undefined;
		}

		return fn.apply(this, arguments);
	};
}
