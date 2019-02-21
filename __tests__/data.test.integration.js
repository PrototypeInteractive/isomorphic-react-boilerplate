/**
 * @jest-environment node
 */

import axios from 'axios';
import 'babel-polyfill';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

beforeAll(async () => {
  jest.setTimeout(30 * 1000); // 30-second timeout
});

describe('/api/v1/data', () => {
  test('GET:/api/v1/data', async () => {
    const response = await axios.get(`${baseUrl}/api/v1/data`);

    expect(response.status).toBe(200);
    expect(response.data.status).toBe('Success');
    expect(response.data.data.length).toBeGreaterThan(0);
  });
});
