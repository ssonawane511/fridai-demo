/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  transform: {},
  moduleNameMapper: {
    "^@sentry/node$": "<rootDir>/jest/sentry-stub.js",
  },
};
