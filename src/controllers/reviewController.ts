import { Request, Response } from "express"
import reviews from "../models/reviewModel"
import books from "../models/booksModel"

export const getAllReviews = async (req: Request, res: Response) => {
   try {
     const result = await reviews.find();
      res.json(result);
   } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
   }
}

export const getReviewById = async (req: Request, res: Response) => {
    const id = req.params.id
   try {
    const result = await reviews.findById(id);

    if (!result) {
      res.status(404).json({message: "Review not found"})
      return  
    }
    res.json(result)
  } catch(error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

export const createReview = async (req: Request, res: Response) => {
   const {name, content, rating, book_id} = req.body

  if (name === undefined) {
    res.status(400).json({error: 'Name is required'}) 
    return; 
  }

  if (content === undefined) {
    res.status(400).json({error: 'Content is required'}) 
    return; 
  }

  if (typeof rating !== 'number' || rating < 1 || rating > 5) {
    res.status(400).json({error: 'Rating is required and must be a number between 1 and 5'}) 
    return; 
  }

  if (book_id === undefined) {
    res.status(400).json({error: 'Book ID is required'}) 
    return; 
  }
  // Check if the book exists before creating a review
  try {
    const result = await books.findById(book_id);

    if (!result) {
      res.status(404).json({message: "Book not found"})
      return 
    }
  } catch(error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
    return
  }

  // Create the review if the book exists
  try {
    const result = await reviews.create({name, content, rating, book_id});
    res.status(201).json({message: 'Review created', newReview: {id: result._id, name: name, content: content, rating: rating, book_id: book_id}})

  } catch (error: unknown) {
    console.error('SERVER ERROR IN CREATEREVIEW:', error);
    const message = error instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

export const updateReview = async (req: Request, res: Response) => {

 const {name, content, rating, bookId} = req.body
const updateData: any = {};

  if (name !== undefined) {
    updateData.name = name;
  }
  if (content !== undefined) {
    updateData.content = content;
  }
  if (rating !== undefined) {
    updateData.rating = rating;
  }
  if (bookId !== undefined) {
    updateData.bookId = bookId;
  }

 if (name === undefined && content === undefined && rating === undefined && bookId === undefined) {
    res.status(400).json({error: 'At least one field is required'}) 
return; 
}

  try {
    const id = req.params.id
    const result = await reviews.findByIdAndUpdate(id, updateData, {returnDocument: 'after'});
    
    if (!result) {
      res.status(404).json({message: `Review ${id} not found`})
      return;
    }
  
    res.json({message: `Review ${id} updated`})
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }  
}

export const deleteReview = async (req: Request, res: Response) => {
     const id = req.params.id
  try {
    const result = await reviews.findByIdAndDelete(id);
    if (!result) {
      res.status(404).json({message: `Review ${id} not found`})
      return
    }
    res.json({message: `Review ${id} deleted`})
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}