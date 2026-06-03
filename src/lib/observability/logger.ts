type LogLevel = 'info' | 'warn' | 'error';

interface LogPayload {
  event: string;
  [key: string]: any;
}

export const logger = {
  log: (level: LogLevel, payload: LogPayload) => {
    // Public hygiene: Strip out known sensitive fields if accidentally passed
    const safePayload = { ...payload };
    delete safePayload.password;
    delete safePayload.token;
    delete safePayload.secret;
    delete safePayload.ip;
    
    // Only output stringified JSON for structured logging
    console[level](JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      ...safePayload
    }));
  },
  info: (payload: LogPayload) => logger.log('info', payload),
  warn: (payload: LogPayload) => logger.log('warn', payload),
  error: (payload: LogPayload) => logger.log('error', payload)
};
