import express from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../controllers/bookController';

import { verifyAdmin } from '../middleware/auth';
const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', verifyAdmin, createBook);
router.patch('/:id', verifyAdmin, updateBook);
router.delete('/:id', verifyAdmin, deleteBook);

export default router;
