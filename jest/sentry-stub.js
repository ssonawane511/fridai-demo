/**
 * Sentry stub for Jest — used so tests run without @sentry/node in test env.
 * Jest maps @sentry/node to this file via moduleNameMapper.
 * Real Sentry is still used at runtime when you run the app (e.g. sdk/run.js).
 */
export function init() {}
export function captureException() {}
