import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.accessToken === undefined) {
    res.status(401).send()
    return
  }

  jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET || "", (error: jwt.VerifyErrors | null, decoded: any) => {
    if (error) {
      res.status(403).send()
      return
    }

    if (!decoded.is_admin) {
      res.status(403).json({ message: 'You are not an admin' })
      return
    }

    next()
  })
}