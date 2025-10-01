import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await AdminServices.blockUser(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User blocked successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  await AdminServices.deleteBlogFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Blog deleted successfully',
  });
});

export const AdminControllers = {
  blockUser,
  deleteBlog,
};
