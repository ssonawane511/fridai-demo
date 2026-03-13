/**
 * Observability helpers - Sentry integration for SDK operations (Node)
 * @module observability
 */

import * as Sentry from "@sentry/node";

/**
 * Wraps an async operation with error capture
 * @param {string} _op - Operation name for span
 * @param {string} _description - Span description
 * @param {() => Promise<T>} fn - Async function to run
 * @returns {Promise<T>}
 * @template T
 */
export async function traceAsync(_op, _description, fn) {
  try {
    return await fn();
  } catch (err) {
    Sentry.captureException(err);
    throw err;
  }
}

/**
 * Wraps a sync operation with error capture
 * @param {string} _op - Operation name
 * @param {string} _description - Operation description
 * @param {() => T} fn - Sync function to run
 * @returns {T}
 * @template T
 */
export function traceSync(_op, _description, fn) {
  try {
    return fn();
  } catch (err) {
    Sentry.captureException(err);
    throw err;
  }
}

/**
 * Captures an exception to Sentry
 * @param {Error} err
 */
export function captureError(err) {
  Sentry.captureException(err);
}
