import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const newBlog = await BlogServices.createBlog(req.user, req.body);

  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: 201,
    data: newBlog,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedBlog = await BlogServices.updateBlog(id, req.user, req.body);

  sendResponse(res, {
    success: true,
    message: 'Blog is updated successfully',
    statusCode: 200,
    data: updatedBlog,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  await BlogServices.deleteBlog(req.user, id);

  sendResponse(res, {
    success: true,
    message: 'Blog is deleted successfully',
    statusCode: 200,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const allBlogs = await BlogServices.getAllBlogs(req.query);

  sendResponse(res, {
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: 200,
    data: allBlogs,
  });
});

export const BlogControllers = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
