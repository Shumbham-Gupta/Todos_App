import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorLog } from '../models';

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as {
      userId: string;
    };

    req.userId = decoded.userId;
    next();
  } catch (error) {
    await ErrorLog.create({
      message: 'Authentication failed',
      stack: error instanceof Error ? error.stack : undefined,
      endpoint: req.path,
      method: req.method,
      statusCode: 401,
    });
    res.status(401).json({ error: 'Invalid token' });
  }
};