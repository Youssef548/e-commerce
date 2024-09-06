// src/modules/users/user.routes.ts
import { Router } from 'express';
import { getUsers, addUser } from './user.controller';

const router = Router();

router.get('/', getUsers);
router.post('/', addUser);

export default router;
