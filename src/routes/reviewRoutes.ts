import express from 'express'
import { verifyAdmin } from '../middleware/auth'
import { getAllReviews, getReviewById, createReview, updateReview, deleteReview } from '../controllers/reviewController'

const router = express.Router()

router.get('/', verifyAdmin, getAllReviews)
router.get('/:id', verifyAdmin, getReviewById)
router.post('/', createReview)
router.patch('/:id', verifyAdmin, updateReview)
router.delete('/:id', verifyAdmin, deleteReview)

export default router