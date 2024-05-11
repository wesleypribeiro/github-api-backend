import { Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';

describe('asyncHandler', () => {
  it('should call the provided function and pass request, response, and next', () => {
    const fn = jest.fn();
    const req = {};
    const res = {};
    const next = jest.fn();

    asyncHandler(fn)(req as unknown as Request, res as unknown as Response, next);

    expect(fn).toHaveBeenCalledWith(req, res, next);
  });

  it('should handle asynchronous function that resolves', async () => {
    const fn = jest.fn().mockResolvedValue('success');
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await asyncHandler(fn)(req as unknown as Request, res as unknown as Response, next);

    expect(fn).toHaveBeenCalledWith(req as unknown as Request, res as unknown as Response, next);
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should handle asynchronous function that rejects', async () => {
    const errorMessage = 'An error occurred';
    const fn = jest.fn().mockRejectedValue(new Error(errorMessage));
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await asyncHandler(fn)(req as unknown as Request, res as unknown as Response, next);

    expect(fn).toHaveBeenCalledWith(req as unknown as Request, res as unknown as Response, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
