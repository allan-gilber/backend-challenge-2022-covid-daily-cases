import  connection  from '../connection';
import csvToJson from 'csvtojson';
import {covidDataStructure} from '../typesAndIntefaces';

const printError = (error: any) => { console.log(error.sqlMessage || error.message); };

let jsonData: null | covidDataStructure[] = null;

const converToJson = async () => {
	await csvToJson().fromFile('./src/data/covid-variants.csv').then(
		(data: covidDataStructure[]): void => {
			jsonData = data;
		}
	);
};

const createTables = () => connection.raw(`
		CREATE TABLE IF NOT EXISTS covid_cases_by_date (
			location VARCHAR(255) NOT NULL,
			date DATE NOT NULL,
			variant VARCHAR(255) NOT NULL,
			num_sequences INT NOT NULL,
			perc_sequences FLOAT NOT NULL,
			num_sequences_total INT NOT NULL
		);
`)
	.then(() => { console.log('Tabela de "casos de covid por data" criada'); })
	.catch(()=> printError);

const insertCasesData = () => connection('covid_cases_by_date')
	.insert(jsonData)
	.then(() => { console.log('Os dados sobre os casos foram inseridos no banco de dados.'); })
	.catch(printError);

const closeConnection = () => { connection.destroy(); };

converToJson()
	.then(createTables)
	.then(insertCasesData)
	.finally(closeConnection);