/**
 * Sentry observability utilities for tracing user flows and async operations.
 */

import * as Sentry from '@sentry/react'

/**
 * Wrap an async operation in a span. Use for API calls, DB operations, expensive computations.
 * @param {string} name - Span description
 * @param {string} [op='function'] - Span operation type
 * @param {() => Promise<T>} fn - Async function to trace
 * @returns {Promise<T>}
 */
export async function traceAsync(name, fn, op = 'function') {
  return Sentry.startSpan({ name, op }, async () => {
    try {
      return await fn()
    } catch (err) {
      Sentry.captureException(err)
      throw err
    }
  })
}

/**
 * Trace an HTTP/API call. Use for fetch, axios, or API layer calls.
 * @param {string} name - API operation name (e.g. "get-blogs", "create-blog")
 * @param {() => Promise<T>} fn - API call function
 * @returns {Promise<T>}
 */
export async function traceFetch(name, fn) {
  return traceAsync(name, fn, 'http.client')
}

/**
 * Start a user flow transaction (page load, form submission, button click flow).
 * Must call transaction.finish() when done. Use try/finally to ensure finish.
 * @param {string} name - Transaction name (e.g. "blog-list-load", "create-blog-submit")
 * @param {string} [op='ui.load'] - Operation type: 'ui.load' | 'ui.action'
 * @returns {{ span: import('@sentry/react').Span, finish: (status?: 'ok' | 'internal_error') => void }}
 */
export function startUserFlow(name, op = 'ui.load') {
  const span = Sentry.startInactiveSpan({
    name,
    op,
    forceTransaction: true,
  })
  Sentry.setActiveSpanInBrowser?.(span)

  return {
    span,
    finish: (status = 'ok') => {
      span.setStatus({ code: status === 'ok' ? 1 : 2 })
      span.end()
    },
  }
}


/**
 * Run a user flow with automatic transaction lifecycle (start, run, finish).
 * @param {string} name - Transaction name
 * @param {string} [op='ui.load'] - Operation type
 * @param {(flow: { setTag: (k, v) => void, setData: (k, v) => void }) => Promise<void>} fn - Flow logic
 */
export async function runUserFlow(name, op = 'ui.load', fn) {
  const { span, finish } = startUserFlow(name, op)
  const flow = {
    setTag: (k, v) => span.setAttribute(k, String(v)),
    setData: (k, v) => span.setAttribute(k, typeof v === 'object' ? JSON.stringify(v) : v),
  }

  try {
    await fn(flow)
    finish('ok')
  } catch (err) {
    Sentry.captureException(err)
    finish('internal_error')
    throw err
  }
}
