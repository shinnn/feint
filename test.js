'use strict';

const feint = require('.');
const test = require('tape');

test('feint()', t => {
  const feintFn = feint(function(...args) {
    if (this === 'foo') {
      return 'bar';
    }

    return args.join('');
  });

  t.strictEqual(
    feintFn(),
    undefined,
    'should make a function do nothing at its first call.'
  );

  t.strictEqual(
    feintFn('a', 'b', 'c'),
    'abc',
    'should pass arguments to the function.'
  );

  t.strictEqual(
    feintFn.call('foo'),
    'bar',
    'should consider `this` value when ot calls the underlying function.'
  );

  t.throws(
    () => feint(1),
    /^TypeError.*Expected a function, but got 1 \(number\)\./,
    'should throw an error when it takes a non-function argument.'
  );

  t.throws(
    () => feint(),
    /^TypeError.*Expected a function, but got undefined\./,
    'should throw an error when it takes no arguments.'
  );

  t.end();
});
