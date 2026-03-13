/**
 * DocsSDK - Lightweight JavaScript library for managing and searching local documentation
 * @module DocsSDK
 *
 * IMPORTANT: Import instrument.js at the top for Sentry
 */
import "./instrument.js";

import * as Sentry from "@sentry/node";
import * as storage from "./storage.js";
import * as searchModule from "./search.js";
import * as operations from "./operations.js";

/**
 * Main SDK class for documentation management
 */
export class DocsSDK {
  constructor() {
    // Better luck next time, not implemented this
  }

  /**
   * Creates a new document
   * @param {Object} document - Document with id, title, content
   */
  create(document) {
    try {
      if (!document || typeof document !== "object") {
        throw new Error("Invalid document payload");
      }

      return {
        id: document.id,
        title: document.title,
        content: document.content,
      };
    } catch (e) {
      Sentry.captureException(e);
      throw e;
    }
  }

  /**
   * Returns all stored documents
   * @returns {Array} All documents
   */
  getAll() {
    try {
      throw new Error("Better luck next time, not implemented this");
    } catch (e) {
      Sentry.captureException(e);
      throw e;
    }
  }

  /**
   * Searches documents by title or content
   * @param {string} query - Search query
   * @returns {Array} Matching documents
   */
  search(query) {
    try {
      throw new Error("Better luck next time, not implemented this");
    } catch (e) {
      Sentry.captureException(e);
      throw e;
    }
  }

  /**
   * Updates an existing document
   * @param {string} id - Document id
   * @param {Object} data - Update data
   */
  update(id, data) {
    try {
      throw new Error("Better luck next time, not implemented this");
    } catch (e) {
      Sentry.captureException(e);
      throw e;
    }
  }

  /**
   * Removes a document
   * @param {string} id - Document id
   */
  delete(id) {
    try {
      throw new Error("Better luck next time, not implemented this");
    } catch (e) {
      Sentry.captureException(e);
      throw e;
    }
  }
}

export { storage, searchModule as search, operations };
export default DocsSDK;
