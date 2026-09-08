import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.cookies.accessToken)
  if (req.cookies.accessToken === undefined) {
    res.status(401).send()
    return
  }

  jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET || "", (error: jwt.VerifyErrors | null) => {
    if (error) {
      res.status(403).send()
      return
    }

    next() // makes the request move on to the next step in the process, in this case move on to greetingSpecific
  })
}
