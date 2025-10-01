import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  const newUser = await AuthServices.registerUser(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: 201,
    data: newUser,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const loggedUser = await AuthServices.loginUser(req.body);
  const { accessToken, refreshToken } = loggedUser;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: 200,
    data: {
      token: { accessToken },
    },
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
};
