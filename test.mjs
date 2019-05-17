import {strict as assert} from 'assert';

import feint from '.';
import test from 'testit';

const feintFn = feint(function(...args) {
	if (this === 'foo') {
		return 'bar';
	}

	return args.join('');
});

test('make a function do nothing at its first call', () => {
	assert.equal(feintFn(), undefined);
	assert.equal(feintFn('a', 'b', 'c'), 'abc');
});

test('consider `this` value when it calls the underlying function', () => {
	assert.equal(feintFn.call('foo'), 'bar');
});

test('throw an error when it takes a non-function argument', () => {
	assert.throws(() => feint(1), /^TypeError.*Expected a function, but got 1 \(number\)\./u);
});

test('throw an error when it takes no arguments', () => {
	assert.throws(() => feint(), /^TypeError.*Expected a function, but got undefined\./u);
});
