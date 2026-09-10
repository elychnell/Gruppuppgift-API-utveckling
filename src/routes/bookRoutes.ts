import express from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../controllers/bookController';
import { verifyToken } from '../middleware/verifyToken';
const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', verifyToken, createBook);
router.patch('/:id', verifyToken, updateBook);
router.delete('/:id', verifyToken, deleteBook);

export default router;
