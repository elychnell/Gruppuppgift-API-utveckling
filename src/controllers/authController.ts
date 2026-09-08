import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const login = async (req: Request, res: Response) => {
    const {username, password} = req.body
    if (username === undefined || password === undefined) {
        res.status(400).json({message: 'username and password are required'})
        return
    }

    const hashedPassword = "$2b$10$WoiGUJIU1IB5VarJOe468eae0wHxD53MI9PJta2ohnBam2R72Kc2S"

    const isLoggedIn = await bcrypt.compare(password, hashedPassword)
    if (username === 'admin' && password === '123') {
        const accessToken = jwt.sign({username}, process.env.JWT_SECRET || "", {expiresIn: '7d'});
        console.log(accessToken)


        res.cookie('accessToken', accessToken, {
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
        res.json({message: 'You are logged in', isLoggedIn: isLoggedIn})
        return;
    } else {
        res.status(401).json({message: 'username/password are wrong'})
        return
    }
}

export const register = async (req: Request, res: Response) => {
    const {username, password} = req.body
    if (username === undefined || password === undefined) {
        res.status(400).json({message: 'username and password are required'})
        return
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        // The hashedPassword is the value that should be saved in the DB, not the plain password. For security reasons
        res.json({message: "You are registered", username: username, password: password, hashedPassword: hashedPassword})
    } catch (e) {
        console.log(e)
    }

    
}

export const logout = async (req: Request, res: Response) => {
    res.clearCookie('accessToken')
    res.json({message: "You are logged out"})
}
