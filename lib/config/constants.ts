export const EXPIRATION_TIMES = {
  '5m': 5 * 60 * 1000,
  '1h': 60 * 60 * 1000,
  '24h': 24 * 60 * 60 * 1000,
  '7d': 7 * 24 * 60 * 60 * 1000,
} as const;

export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-secret-key';