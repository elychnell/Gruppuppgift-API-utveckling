import { Request, Response } from "express"
import reviews from "../models/model"

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
      res.status(404).json({message: "Product not found"})
      return  
    }
    res.json(result)
  } catch(error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

export const createReview = async (req: Request, res: Response) => {
   const {name, content, rating, bookId} = req.body

  if (name === undefined) {
    res.status(400).json({error: 'Title is required'}) 
    return; 
  }

  if (content === undefined) {
    res.status(400).json({error: 'Description is required'}) 
    return; 
  }

  if (rating === undefined) {
    res.status(400).json({error: 'Rating is required'}) 
    return; 
  }

  if (bookId === undefined) {
    res.status(400).json({error: 'Book ID is required'}) 
    return; 
  }

  try {
    const result = await reviews.create({name, content, rating, bookId});
    res.status(201).json({message: 'Product created', newProduct: {id: result._id, name: name, content: content, rating: rating, bookId: bookId}})

  } catch (error: unknown) {
    console.error('SERVER ERROR IN CREATEPRODUCT:', error);
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
      res.status(404).json({message: `Product ${id} not found`})
      return;
    }
  
    res.json({message: `Product ${id} updated`})
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
      res.status(404).json({message: `Product ${id} not found`})
      return
    }
    res.json({message: `Product ${id} deleted`})
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}