# Remediation Guide

## F-001 — Dynamic Code Execution

**Vulnerable pattern:** `eval(expression)`.

**Risk:** untrusted input could be interpreted as JavaScript and execute unintended code.

**Remediation:** replace dynamic execution with an allow-list of supported operations and validate input types before processing.

The remediated implementation is in `secure-app/app.js`.

## F-002 — Hardcoded Secret

**Vulnerable pattern:** a synthetic API key is assigned directly in source code.

**Risk:** real credentials committed to source control can be copied from history, forks, logs, or build artifacts.

**Remediation:** load secrets from `process.env` and supply them at runtime from a CI/CD secret store or cloud secret manager.

The secure example uses:

```js
const apiKey = process.env.DEMO_API_KEY;
```

## F-003 — Vulnerable Dependency

**Vulnerable pattern:** `lodash` version `4.17.15` is pinned in the vulnerable application for SCA demonstration.

**Remediation:** upgrade to a patched release (`4.17.21` in this lab), regenerate the lock file, run tests, and re-scan before merge.

## Production Pattern

In a real environment, the security gate would block a pull request or deployment when findings exceed the organization's accepted severity threshold. Exceptions should be documented, time-bounded, risk accepted, and tracked to remediation.
