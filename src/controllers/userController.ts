import { Request, Response } from "express";
import User from '../models/user'
import bcrypt from 'bcrypt'

export const fetchAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}, '-password');
        res.json(users);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const fetchUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id, '-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const targetId = req.params.id
        const { username, is_admin, password } = req.body
        const updateData: any = { username, is_admin }

        if (password) {
            updateData.password = await bcrypt.hash(password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(
            targetId,
            updateData,
            { new: true, runValidators: true }
        ).select('-password')

        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' })
            return
        }

        res.json(updatedUser)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}        