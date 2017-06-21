const calculator = require('../../server/specs/sample.js');

describe('multiplication', () => {
  it('should multiply 2 and 3', () => {
    let product = calculator.multiply(2, 3);
    expect(product).toBe(6);
  });
});
