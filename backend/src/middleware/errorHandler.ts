import { Request, Response, NextFunction } from 'express';
import { ErrorLog } from '../models';
import { AuthRequest } from './auth';

export const errorHandler = async (
  error: Error,
  req: Request | AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  // Log error to MongoDB
  try {
    await ErrorLog.create({
      message: error.message,
      stack: error.stack,
      endpoint: req.path,
      method: req.method,
      userId: (req as AuthRequest).userId || undefined,
      statusCode,
    });
  } catch (logError) {
    console.error('Failed to log error to database:', logError);
  }

  res.status(statusCode).json({
    error: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};