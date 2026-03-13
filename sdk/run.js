#!/usr/bin/env node
/**
 * Simple script to run the SDK in Node
 * Usage: node run.js
 */

import "./instrument.js";
import * as Sentry from "@sentry/node";
import DocsSDK from "./index.js";

// Verify Sentry - intentional error test
try {
  const sdk = new DocsSDK();
  sdk.create({ id: "test", title: "Test", content: "Content" });
} catch (e) {
  Sentry.captureException(e);
  console.error("Caught:", e.message);
}
