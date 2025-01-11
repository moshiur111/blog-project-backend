import AppError from '../../error/AppError';
import { Blog } from '../blog/blog.model';
import { User } from '../user/user.model';

const blockUser = async (id: string) => {
  const blockedUser = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  );

  if (!blockedUser) {
    throw new AppError('This user is not exists', 404);
  }

  return blockedUser;
};

const deleteBlog = async (id: string) => {
  const isBlog = await Blog.findByIdAndDelete(id);

  if (!isBlog) {
    throw new AppError('This blog does not exists', 404);
  }

  return {};
};

export const AdminServices = {
  blockUser,
  deleteBlog,
};
