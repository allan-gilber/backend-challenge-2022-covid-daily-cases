import express from 'express';
import cors from 'cors';
import { AddressInfo } from 'net';
import connection from './connection';
import { Request, Response } from 'express';
import serverStatus from './endpoints/serverStatus';
import multer from 'multer';

const upload = multer({dest: 'uploads/'});

const app = express();

app.use(express.json());
app.use(cors());

const server = app.listen(process.env.PORT || 3003, () => {
	if (server) {
		const address = server.address() as AddressInfo;
		return console.log(`Welcome aboard, Captain. Server is running in http://localhost:${address.port}`);
	} 
	console.error('Failure upon starting server.');
	
});

// [GET]/: Retornar um Status: 200 e uma Mensagem "Backend Challenge 2021 🏅 - Covid Daily Cases"

app.get('/', serverStatus);

// [GET]/cases/:date/count: Listar todos os registros da base de dados no dia selecionado, agrupados por país e separados por variante.

app.get('/cases/:date/count', serverStatus);

// [GET]/cases/:date/cumulative: Listar todos os registros da base de dados, retornando a soma dos casos registrados de acordo com a data selecionada, agrupados por país e separados por variante.

// [GET]/dates: Listar as datas disponíveis no dataset