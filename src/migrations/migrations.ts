import  connection  from '../connection';
import csvToJson from 'csvtojson';
import {covidDatabaseResponseStructure} from '../typesAndIntefaces';

const printError = (error: any) => { console.log(error.sqlMessage || error.message); };

let jsonData: null | covidDatabaseResponseStructure[] = null;

const convertToJson = async () => {
	await csvToJson().fromFile('./src/data/covid-variants.csv').then(
		(data: covidDatabaseResponseStructure[]): void => {
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
			perc_sequences DECIMAL(10,2) NOT NULL,
			num_sequences_total INT NOT NULL
		);
`)
	.then(() => { console.log('Table of "covid cases by date" created!'); })
	.catch(()=> printError);

const insertCasesData = () => connection('covid_cases_by_date')
	.insert(jsonData)
	.then(() => { console.log('Data of covid cases has successfully been inserted into the database!'); })
	.catch(printError);

const closeConnection = () => { connection.destroy(); };

convertToJson()
	.then(createTables)
	.then(insertCasesData)
	.finally(closeConnection);