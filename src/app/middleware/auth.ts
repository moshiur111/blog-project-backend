import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import AppError from '../error/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';
import status from 'http-status';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError(status.UNAUTHORIZED, 'Invalid credentials');
    }

    const token = authHeader?.split(' ')[1];

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId } = decoded;

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError(status.NOT_FOUND, 'This user is not found');
    }

    if (user.isBlocked) {
      throw new AppError(status.FORBIDDEN, 'This user is blocked');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(status.UNAUTHORIZED, 'Invalid credentials');
    }

    req.user = decoded;

    next();
  });
};

export default auth;
