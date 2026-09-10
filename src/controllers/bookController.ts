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

// POST /api/books
export const createBook = async (req: Request, res: Response) => {
  try {
    console.log('Request body:', req.body); // Log the request body to see what is being sent
    const newBook = await book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// PATCH /api/books/:id
export const updateBook = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const updatedBook = await book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.json(updatedBook);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

// DELETE /api/books/:id
export const deleteBook = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const deletedBook = await book.findByIdAndDelete(id);
    if (!deletedBook) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};
