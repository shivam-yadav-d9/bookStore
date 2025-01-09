import express from 'express';
import { login, signup } from '../model/Usermodel.js'; // Update to 'model'

const router = express.Router();

router.post("/signup", signup);
router.post("/login",login);

export default router;
