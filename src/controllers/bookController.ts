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
