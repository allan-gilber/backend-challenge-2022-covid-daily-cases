import { Request, Response } from 'express';

export default async function createUser (
	req: Request,
	res: Response
): Promise<void> {
	res.status(200).send({message: 'Backend Challenge 2021 🏅 - Covid Daily Cases'});
}