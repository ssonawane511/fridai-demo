/**
 * Sentry instrumentation - MUST be imported at the top of your entry file
 * @see https://docs.sentry.io/platforms/javascript/
 *
 * Set SENTRY_DSN: SENTRY_DSN=xxx node sdk/run.js
 */

import * as Sentry from "@sentry/node";

const dsn = process.env.SENTRY_DSN;

Sentry.init({
  dsn,
  sendDefaultPii: true,
});
