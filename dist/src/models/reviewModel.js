"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const reviewsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    book_id: {
        type: Schema.Types.ObjectId,
        ref: 'book',
        required: false,
    },
});
exports.default = mongoose_1.default.model('review', reviewsSchema);
