import status from 'http-status';
import { User } from '../user/user.model';
import { Blog } from '../blog/blog.model';
import AppError from '../../error/AppError';

const blockUser = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User not found');
  }

  if (user.isBlocked) {
    throw new AppError(status.BAD_REQUEST, 'User is already blocked');
  }

  user.isBlocked = true;
  await user.save();

  return user;
};

const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(status.NOT_FOUND, 'Blog not found');
  }

  return result;
};

export const AdminServices = {
  blockUser,
  deleteBlogFromDB,
};
