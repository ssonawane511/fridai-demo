#!/usr/bin/env node
/**
 * SDK demo script – exercises all API functions from the SOFTWARE DOCUMENT.
 * Usage: SENTRY_DSN=<dsn> node sdk/run.js   (or npm run sdk)
 *
 * Covers: create, getAll, search, update, delete
 */

import "./instrument.js";
import * as Sentry from "@sentry/node";
import DocsSDK from "./index.js";

function run() {
  const sdk = new DocsSDK();

  // --- Initialize SDK (constructor above) ---

  // --- Create Document ---
  try {
    sdk.create({ id: "intro", title: "Introduction", content: "This SDK manages local documentation." });
    sdk.create({ id: "usage", title: "Usage Guide", content: "Initialize, create, search, update, delete." });
    sdk.create({ id: "api", title: "API Reference", content: "create(), getAll(), search(), update(), delete()." });
    console.log("[run] create(): added intro, usage, api");
  } catch (e) {
    Sentry.captureException(e);
    console.error("[run] create() error:", e.message);
  }

  // --- Get All Documents ---
  try {
    const all = sdk.getAll();
    console.log("[run] getAll():", Array.isArray(all) ? all.length : 0, "documents");
  } catch (e) {
    Sentry.captureException(e);
    console.error("[run] getAll() error:", e.message);
  }

  // --- Search Documentation ---
  try {
    const searchResult = sdk.search("documentation");
    console.log("[run] search('documentation'):", Array.isArray(searchResult) ? searchResult.length : 0, "matches");
  } catch (e) {
    Sentry.captureException(e);
    console.error("[run] search() error:", e.message);
  }

  // --- Update Document ---
  try {
    sdk.update("usage", { title: "Usage Guide", content: "Initialize SDK, Create Document, Get All, Search, Update, Delete." });
    console.log("[run] update('usage'): done");
  } catch (e) {
    Sentry.captureException(e);
    console.error("[run] update() error:", e.message);
  }

  // --- Delete Document ---
  try {
    sdk.delete("usage");
    console.log("[run] delete('usage'): done");
  } catch (e) {
    Sentry.captureException(e);
    console.error("[run] delete() error:", e.message);
  }

  // --- Verify state after delete ---
  try {
    const after = sdk.getAll();
    console.log("[run] getAll() after delete:", Array.isArray(after) ? after.length : 0, "documents");
  } catch (e) {
    Sentry.captureException(e);
    console.error("[run] getAll() error:", e.message);
  }
}

run();
