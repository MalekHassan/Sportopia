'use strict';

const middle404 = require('../src/models/middleware/404');

describe('404 Middleware Test', () => {
  const req = {};
  const res = {};
  const next = jest.fn();
  it('should response to 404 if it was called', () => {
    middle404(req, res, next);
    expect(res.statusCode).toBe(404);
  });
  it('should Not call next() ', () => {
    middle404(req, res, next);
    expect(next).not.toHaveBeenCalledWith();
  });
});
