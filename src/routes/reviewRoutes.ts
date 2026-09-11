import express from 'express'
import { verifyToken } from '../middleware/verifyToken'
import { getAllReviews, getReviewById, createReview, updateReview, deleteReview } from '../controllers/reviewController'

const router = express.Router()

router.get('/', verifyToken, getAllReviews)
router.get('/:id', verifyToken, getReviewById)
router.post('/', createReview)
router.patch('/:id', verifyToken ,updateReview)
router.delete('/:id', verifyToken, deleteReview)

export default router