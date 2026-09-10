import { Request, Response } from 'express';
import book from '../models/booksModel';

// GET /api/books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const result = await book.find();
    res.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

// GET /api/books/:id with populate to get reviews for the specific book
export const getBookById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await book.findById(id).populate('reviews');
    if (!result) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};
