import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import AppError from '../error/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next:NextFunction) => {
    let token = req.headers.authorization;

    if (!token) {
      throw new AppError('Invalid credentials', 401);
    }

    token = token?.split(' ')[1];

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    console.log('From Auth =>', decoded);

    const { role, userId } = decoded;

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('This user is not found', 404);
    }

    const isBlocked = user?.isBlocked;

    if (isBlocked) {
      throw new AppError('This user is blocked', 403);
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError('Invalid credentials', 401);
    }

    req.user = decoded;
    
    next()
  });
};

export default auth;
