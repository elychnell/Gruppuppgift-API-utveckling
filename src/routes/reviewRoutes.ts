import express from 'express'
import { getAllReviews, getReviewById, createReview, updateReview, deleteReview } from '../controllers/reviewController'

const router = express.Router()

router.get('/', getAllReviews)
router.get('/:id', getReviewById)
router.post('/', createReview)
router.patch('/:id', updateReview)
router.delete('/:id', deleteReview)

export default router