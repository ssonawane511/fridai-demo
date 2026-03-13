#!/usr/bin/env bash
# Run the SDK demo (sdk/run.js) with Sentry DSN from environment.
# Usage: SENTRY_DSN=https://...@sentry.io/... ./scripts/run-with-sentry.sh
# Or:   export SENTRY_DSN=... && ./scripts/run-with-sentry.sh

set -e
cd "$(dirname "$0")/.."

if [ -z "${SENTRY_DSN}" ]; then
  echo "SENTRY_DSN is not set. Set it to your Sentry project DSN to send events."
  echo "Example: SENTRY_DSN=https://key@o123.ingest.sentry.io/456 node sdk/run.js"
fi

node sdk/run.js
