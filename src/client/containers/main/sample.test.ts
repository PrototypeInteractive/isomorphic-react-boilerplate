export const foo = 'foo';
import Suffixer from './Suffixer'

describe('Vanilla test - just to see if ts-jest works', () => {
  it('Check result FakeClass adds suffix ',  () => {
    const input: string = 'Name';
    const fk = new Suffixer();
    const response = fk.addSuffix(input);
    expect(response).toBe('Name - beta');
  });
});
