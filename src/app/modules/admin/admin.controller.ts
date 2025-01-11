import AppError from '../../error/AppError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { User } from '../user/user.model';
import { AdminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId)
  console.log(user);

  if(!user) {
    throw new AppError("This user does not exists", 404);
  }

  const isBlocked = user?.isBlocked

  if(isBlocked) {
    throw new AppError("This user already blocked", 403);
  }

  await AdminServices.blockUser(userId);

  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: 200,
  });
});


const deleteBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    await AdminServices.deleteBlog(id);
  
    sendResponse(res, {
      success: true,
      message: 'Blog deleted successfully',
      statusCode: 200,
    });
  });

export const AdminControllers = {
  blockUser,
  deleteBlog
};
