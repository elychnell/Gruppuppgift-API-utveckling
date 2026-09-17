"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const reviewController_1 = require("../controllers/reviewController");
const router = express_1.default.Router();
router.get('/', auth_1.verifyAdmin, reviewController_1.getAllReviews);
router.get('/:id', auth_1.verifyAdmin, reviewController_1.getReviewById);
router.post('/', reviewController_1.createReview);
router.patch('/:id', auth_1.verifyAdmin, reviewController_1.updateReview);
router.delete('/:id', auth_1.verifyAdmin, reviewController_1.deleteReview);
exports.default = router;
