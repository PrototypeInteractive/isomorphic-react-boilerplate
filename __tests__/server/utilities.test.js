import uuid from 'uuid/v4';
import Utilities from '../../src/server/common/utilities';
import logger from '../../src/server/common/logger';

jest.mock('../../src/server/common/logger');

beforeAll(async () => {
  jest.setTimeout(30 * 1000); // 30-second timeout
});

describe('Timers', () => {
  beforeEach(() => {
    logger.debug.mockReset();
  });

  test('Start timer', () => {
    const label = uuid();
    const timer = Utilities.startTimer(label);

    expect(timer.label).toBe(label);
    expect(timer.timestamp).not.toBeNull();
    expect(logger.debug.mock.calls.length).toBe(1);
  });

  test('Stop timer', () => {
    const label = uuid();
    const timer = Utilities.startTimer(label);
    const duration = Utilities.startTimer(timer);

    expect(duration).not.toBeNull();
    expect(logger.debug.mock.calls.length).toBe(2);
  });

  test('Start timer without logs', () => {
    const label = uuid();
    const timer = Utilities.startTimer(label, true);

    expect(timer.label).toBe(label);
    expect(timer.timestamp).not.toBeNull();
    expect(logger.debug.mock.calls.length).toBe(0);
  });

  test('Stop timer without logs', () => {
    const label = uuid();
    const timer = Utilities.startTimer(label, true);
    const duration = Utilities.startTimer(timer, true);

    expect(duration).not.toBeNull();
    expect(logger.debug.mock.calls.length).toBe(0);
  });
});
