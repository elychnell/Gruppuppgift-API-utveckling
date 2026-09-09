import express from 'express'
import { getAllReviews, getReviewById, createReview, updateReview, deleteReview } from '../controllers/reviewController'

const router = express.Router()

router.get('/reviews', getAllReviews)
router.get('/reviews/:id', getReviewById)
router.post('/reviews', createReview)
router.patch('/reviews/:id', updateReview)
router.delete('/reviews/:id', deleteReview)

export default router