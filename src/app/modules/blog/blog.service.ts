import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { blogSearchableFields } from './blog.constant';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { User } from '../user/user.model';
import status from 'http-status';

const createBlog = async (userData: JwtPayload, payload: TBlog) => {
  const user = await User.findById(userData.userId);

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'This user is not found');
  }

  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError(status.FORBIDDEN, 'This user is blocked');
  }

  const blogData = {
    ...payload,
    author: user._id,
  };

  const newBlog = (await Blog.create(blogData)).populate('author');

  return newBlog;
};

const updateBlog = async (
  id: string,
  userData: JwtPayload,
  payload: Partial<TBlog>,
) => {
  const user = await User.findById(userData.userId);

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'This user is not found');
  }

  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError(status.FORBIDDEN, 'This user is blocked');
  }

  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(status.NOT_FOUND, 'This blog does not exits');
  }

  if (user._id.toString() !== blog.author.toString()) {
    throw new AppError(
      status.FORBIDDEN,
      'This is not a valid author for this blog',
    );
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('author');

  return updatedBlog;
};

const deleteBlog = async (userData: JwtPayload, id: string) => {
  const user = await User.findById(userData.userId);

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'This user is not found');
  }

  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError(status.FORBIDDEN, 'This user is blocked');
  }

  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(status.NOT_FOUND, 'This blog does not exits');
  }

  if (user._id.toString() !== blog.author.toString()) {
    throw new AppError(
      status.FORBIDDEN,
      'This is not a valid author for this blog',
    );
  }

  await Blog.findByIdAndDelete(id);

  return {};
};

const getAllBlogs = async (query: Record<string, unknown>) => {
const baseQuery = Blog.find()
  .populate({
    path: 'author',
    match: { isBlocked: false },
  })

  const blogsQuery = new QueryBuilder(baseQuery, query)
    .search(blogSearchableFields)
    .filter()
    .sort();

  const result = await blogsQuery.modelQuery;

  const filteredResult = result.filter((blog) => blog.author);

  return filteredResult;
};


export const BlogServices = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
