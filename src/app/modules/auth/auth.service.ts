import { User } from '../user/user.model';
import { TRegisterUser } from './auth.interface';

const registerUser = async (payload: TRegisterUser) => {
  const user = await User.create(payload);
  return user;
};

export const AuthServices = {
  registerUser,
};
