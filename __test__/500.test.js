'use strict';

const middle500 = require('../src/models/middleware/500');

describe('404 Middleware Test', () => {
  const err = {};
  const req = {};
  const res = {};
  const next = jest.fn();
  it('should response to 500 if it was called', () => {
    middle500(err, req, res, next);
    expect(res.statusCode).toBe(500);
  });
  it('should Not call next() ', () => {
    middle500(req, res, next);
    expect(next).not.toHaveBeenCalledWith();
  });
});
