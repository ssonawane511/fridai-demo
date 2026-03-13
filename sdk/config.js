/**
 * SDK configuration - Sentry DSN and observability settings
 * @module config
 */

const dsn = process.env.SENTRY_DSN;

/**
 * SDK config object
 * @type {{ sentryDsn: string | undefined }}
 */
export const config = {
  sentryDsn: dsn,
};

/**
 * Configure the SDK (e.g. override Sentry DSN)
 * @param {Partial<{ sentryDsn: string }>} overrides
 */
export function configure(overrides) {
  if (overrides?.sentryDsn !== undefined) {
    config.sentryDsn = overrides.sentryDsn;
  }
}

export default config;
