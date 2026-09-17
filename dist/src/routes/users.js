"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.get('/', auth_1.verifyAdmin, userController_1.fetchAllUsers);
router.get('/:id', auth_1.verifyAdmin, userController_1.fetchUserById);
router.patch('/:id', auth_1.verifyAdmin, userController_1.updateUser);
router.delete('/:id', auth_1.verifyAdmin, userController_1.deleteUser);
exports.default = router;
