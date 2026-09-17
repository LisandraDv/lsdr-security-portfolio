const _ = require('lodash');

// INTENTIONALLY INSECURE: this file exists only for a controlled portfolio lab.
// Never copy these patterns into production code.

const DEMO_API_KEY = 'demo_key_portfolio_only_1234567890';

function calculateExpression(expression) {
  // SAST finding: eval() executes arbitrary JavaScript.
  return eval(expression);
}

function getDisplayName(user) {
  return _.get(user, 'profile.displayName', 'Unknown user');
}

if (require.main === module) {
  console.log('Vulnerable demo loaded. Do not use in production.');
  console.log(`Synthetic key prefix: ${DEMO_API_KEY.slice(0, 8)}...`);
  console.log(getDisplayName({ profile: { displayName: 'Security Lab' } }));
}

module.exports = { calculateExpression, getDisplayName };
