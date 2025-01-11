import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { blogConstant } from './blog.constant';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { User } from '../user/user.model';

const createBlog = async (userData: JwtPayload, payload: TBlog) => {
  const user = await User.findById(userData.userId);

  if (!user) {
    throw new AppError('This user is not found', 404);
  }

  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError('This user is blocked', 403);
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
    throw new AppError('This user is not found', 404);
  }

  console.log('From blog service =>', user);

  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError('This user is blocked', 403);
  }

  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError('This blog does not exits', 404);
  }

  if (user._id.toString() !== blog.author.toString()) {
    throw new AppError('This is not a valid author for this blog', 403);
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('author');

  return updatedBlog;
};

const deleteBlog = async (userData: JwtPayload, id: string) => {

  const user = await User.findById(userData.userId);

  if (!user) {
    throw new AppError('This user is not found', 404);
  }

  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError('This user is blocked', 403);
  }

  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError('This blog does not exits', 404);
  }

  if (user._id.toString() !== blog.author.toString()) {
    throw new AppError('This is not a valid author for this blog', 403);
  }
  
  await Blog.findByIdAndDelete(id);

  return {};
};

const getAllBlogs = async (query: Record<string, unknown>) => {
  const blogsQuery = new QueryBuilder(Blog.find().populate('author'), query)
    .search(blogConstant)
    .filter('author')
    .sort();

  const blogs = await blogsQuery.modelQuery;

  return blogs;
};

export const BlogServices = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
