const _ = require('lodash');

const apiKey = process.env.DEMO_API_KEY;

const operations = Object.freeze({
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) throw new Error('Division by zero is not allowed.');
    return a / b;
  }
});

function calculate(operation, a, b) {
  const handler = operations[operation];
  if (!handler) throw new Error('Unsupported operation.');
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError('Inputs must be finite numbers.');
  }
  return handler(a, b);
}

function getDisplayName(user) {
  return _.get(user, 'profile.displayName', 'Unknown user');
}

if (require.main === module) {
  console.log('Secure demo loaded.');
  console.log(`Credential source: ${apiKey ? 'environment variable present' : 'environment variable not set'}`);
  console.log(`2 + 3 = ${calculate('add', 2, 3)}`);
}

module.exports = { calculate, getDisplayName };
