import express from 'express';
import { createUser } from '../controllers/user.controller';
import { validateUserBody } from '../middleware/user.validator';

const router = express.Router();

router.post('/', validateUserBody, createUser);
// router.get("/", getUser);
// router.get("/:address", getUserByAddress);

export default router;
