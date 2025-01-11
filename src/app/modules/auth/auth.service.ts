import config from '../../config';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { TLogingUser, TRegisterUser } from './auth.interface';
import { createToken } from './auth.utils';

const registerUser = async (payload: TRegisterUser) => {
  const user = await User.create(payload);
  return user;
};

const loginUser = async (payload: TLogingUser) => {
  // const user = await User.findOne({email: payload.email})
  const user = await User.isUserExistsByEmail(payload?.email);

  if (!user) {
    throw new AppError('This user is not found', 404);
  }

  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError('This user is blocked', 403);
  }

  console.log(user.password);

  if (!(await User.isPasswordMatched(payload?.password, user.password))) {
    throw new AppError('This password is not matched', 403);
  }

  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return accessToken
};

export const AuthServices = {
  registerUser,
  loginUser,
};
