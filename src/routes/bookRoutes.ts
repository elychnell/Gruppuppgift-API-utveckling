import express from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../controllers/bookController';
const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.patch('/:id', updateBook);
router.post('/', createBook);
router.delete('/:id', deleteBook);

export default router;
