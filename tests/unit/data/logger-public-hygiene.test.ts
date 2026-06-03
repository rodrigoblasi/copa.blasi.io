import { describe, it, expect, vi, afterEach } from 'vitest';
import { logger } from '@/lib/observability/logger';

describe('Logger public hygiene', () => {
  const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});

  afterEach(() => {
    consoleSpy.mockClear();
  });

  it('strips sensitive fields', () => {
    logger.info({ event: 'test', token: '123', ip: '1.1.1.1', safeData: 'ok' });
    const logCall = consoleSpy.mock.calls[0][0];
    const parsed = JSON.parse(logCall);
    
    expect(parsed.token).toBeUndefined();
    expect(parsed.ip).toBeUndefined();
    expect(parsed.safeData).toBe('ok');
    expect(parsed.event).toBe('test');
  });
});
