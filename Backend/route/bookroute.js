import express from 'express';
import { getBooks } from '../model/bookmodel.js'; // Import the controller functions from bookmodel.js

const router = express.Router();

router.get("/", getBooks);

export default router;
