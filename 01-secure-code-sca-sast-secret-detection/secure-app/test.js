const assert = require('node:assert/strict');
const { calculate, getDisplayName } = require('./app');

assert.equal(calculate('add', 2, 3), 5);
assert.equal(calculate('multiply', 4, 5), 20);
assert.equal(getDisplayName({ profile: { displayName: 'Lisandra' } }), 'Lisandra');
assert.throws(() => calculate('unknown', 1, 2), /Unsupported operation/);
assert.throws(() => calculate('divide', 1, 0), /Division by zero/);

console.log('secure-app tests passed');
