import type { NextFunction, RequestHandler, Request, Response } from "express";

export const asyncHandler = (
  callback: (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => Promise<any>,
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(callback(req, res, next)).catch(next);
  };
};
