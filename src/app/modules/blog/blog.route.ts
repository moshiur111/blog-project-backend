import { Router } from 'express';
import { BlogControllers } from './blog.controller';
import auth from '../../middleware/auth';

const router = Router();

router.patch('/:id', auth('user'), BlogControllers.updateBlog);

router.delete('/:id', auth('user'), BlogControllers.deleteBlog);

router.post('/', auth('user'), BlogControllers.createBlog);

router.get('/', BlogControllers.getAllBlogs);

export const BlogRoutes = router;
