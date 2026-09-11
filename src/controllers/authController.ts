import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user'

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body
    if (username === undefined || password === undefined) {
        res.status(400).json({ message: 'username and password are required' })
        return
    }

    try {
        const user = await User.findOne({ username })
        if (!user) {
            res.status(401).json({ message: 'Invalid username or password' })
            return
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid username or password' })
            return
        }

        const token = jwt.sign(
            { username: user.username },
            process.env.JWT_SECRET || "",
            { expiresIn: '7d' }
        )

        res.cookie('accessToken', token, {
            // Prevents client-side JavaScript from accessing the cookie (e.g. document.cookie).
            // This protects against XSS attacks where malicious scripts try to steal the token.
            httpOnly: true, // JS has no access to the cookie

            // When true, the cookie is only sent over HTTPS connections.
            // We enable this in production (where we use HTTPS) but disable it locally (HTTP).
            secure: false,

            // Controls when the cookie is sent with cross-site requests.
            // 'none': Cookie is sent on all cross-origin requests (required when frontend and API are on different domains in production). Requires secure: true.
            // 'lax': Cookie is sent on same-site requests and top-level navigations (safe default for local development).
            sameSite: 'lax',

            // How long the cookie lives in the browser, in milliseconds.
            // After this time the browser automatically deletes the cookie and the user must log in again.
            maxAge: 1000 * 60 * 60 * 24 * 7 // Lives on for 7 days
        })

        res.json({
            message: 'Login successful',
            id: user.id,
            username: user.username,
            is_admin: user.is_admin
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong, server error' })
    }
}

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body

    if (username === undefined || password === undefined) {
        res.status(400).json({ message: 'username and password are required' })
        return
    }

    try {
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            res.status(409).json({ message: 'Username is already taken' })
            return
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            password: hashedPassword
        })

        await newUser.save()

        res.status(201).json({
            message: 'User registered successfully',
            id: newUser.id,
            username: newUser.username,
            is_admin: newUser.is_admin,
            created_at: newUser.created_at
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong, server error' })
    }
}

export const logout = async (req: Request, res: Response) => {
    res.clearCookie('accessToken')
    res.json({ message: "You are logged out" })
}

export const status = async (req: Request, res: Response) => {
    const token = req.cookies.accessToken

    if (!token) {
        res.json({ authenticated: false })
        return
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET || "")
        res.json({ authenticated: true })
    } catch {
        res.json({ authenticated: false })
    }
}