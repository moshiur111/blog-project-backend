import status from 'http-status';
import config from '../../config';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { TLogingUser, TRegisterUser } from './auth.interface';
import { createToken } from './auth.utils';

const registerUser = async (payload: TRegisterUser) => {
  const user = await User.isUserExistsByEmail(payload?.email);
  if (user) {
    throw new AppError(status.BAD_REQUEST, 'User is already exists');
  }
  const NewUser = await User.create(payload);
  return NewUser;
};

const loginUser = async (payload: TLogingUser) => {
  const user = await User.isUserExistsByEmail(payload?.email);

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'This user is not found');
  }

  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError(status.FORBIDDEN, 'This user is blocked');
  }

  if (!(await User.isPasswordMatched(payload?.password, user.password))) {
    throw new AppError(status.FORBIDDEN, 'This password is not matched');
  }

  const jwtPayload = {
    userId: user._id.toString(),
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return { accessToken, refreshToken };
};

export const AuthServices = {
  registerUser,
  loginUser,
};
