import AppError from '../../error/AppError';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlog = async (payload: TBlog) => {
  const newBlog = (await Blog.create(payload)).populate('author');
  return newBlog;
};

const updateBlog = async (id: string, payload: Partial<TBlog>) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError('This blog does not exits', 404);
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('author');

  return updatedBlog;
};

const deleteBlog = async (id: string) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError('This blog does not exits', 404);
  }

  await Blog.findByIdAndDelete(id);

  return {};
};

const getAllBlogs = async () => {
  const allBlogs = await Blog.find();

  return allBlogs;
};

export const BlogServices = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
