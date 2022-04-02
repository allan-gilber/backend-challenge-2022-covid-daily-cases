// import { Request, Response } from 'express';
// // import { connection } from '../data/connection';
// // import { user } from '../types';
// // import { addressConsult } from '../services/addressConsult';

// export default async function createUser(
// 	req: Request,
// 	res: Response
// ): Promise<void> {
// 	try {
// 		const { name, nickname, email, cep, numero, complemento } = req.body;

// 		if (!name || !nickname || !email || !cep || !numero) {
// 			res.statusCode = 422;
// 			throw 'Os campos \'name\', \'nickname\', \'email\', \'cep\', \'numero\' e \'complemento\' são obrigatórios';
// 		}

// 		const id: string = Date.now().toString();

// 		const getUserAddress = async () => {
// 			const completeAddress = await addressConsult(cep);

// 			const addressString =
//         `${completeAddress.logradouro}, nº ${numero} ` +
//         (complemento ? `- ${complemento} ` : '') +
//         `- ${completeAddress.bairro} (${cep}) - ${completeAddress.localidade}, ${completeAddress.uf}`;

// 			return addressString;
// 		};

// 		const address = await getUserAddress();

// 		console.log(address, '323');

// 		const newUser = { id, name, nickname, email, address };

// 		await connection('aula51_users').insert(newUser);

// 		res.status(201).send('Usuário criado!');
// 	} catch (error: any) {
// 		if (typeof error === 'string') {
// 			res.send(error);
// 		} else {
// 			console.log(error.sqlMessage || error.message);
// 			res.status(500).send('Ops! Um erro inesperado ocorreu =/');
// 		}
// 	}
// }