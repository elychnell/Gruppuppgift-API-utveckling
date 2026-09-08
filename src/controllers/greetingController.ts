import { Request, Response } from "express"

export const greetingSpecific = async (req: Request, res: Response) => {
    const name = req.params.name

    res.json({message: `Hello ${name}, welcome to your admin panel!`})
}