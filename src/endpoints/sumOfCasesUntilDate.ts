import { isValid } from 'date-fns';
import { Request, Response } from 'express';
import connection from '../connection';
import {  covidDatabaseResponseStructure } from '../typesAndIntefaces';

export default async function sumOfCasesUntilDate (
	req: Request,
	res: Response
): Promise<void> {
	try {
		const { date } = req.params;
		if (typeof date !== 'string' || date.length !== 10 || !isValid(new Date(date)) ){
			throw 'invalidDate';
		}

		await connection.raw(`
			SELECT location, variant, SUM(num_sequences) as "numberOfSequences", CAST(AVG(perc_sequences) as DECIMAL(10,2)) as "percentageOfSequences", SUM(num_sequences_total) as "totalOfSequencesNumbers" 
			FROM covid_cases_by_date
			WHERE date <= "${date}"
			GROUP BY variant, location
			ORDER BY location, variant ASC;
		`)
			.then((data:[covidDatabaseResponseStructure[]]) => {
				if(!data[0].length){
					throw 'notFound';
				}
				const finalObject: any = {} ;

				data[0].map((caseData) => {
					const nameOfLocation: string = caseData.location;
					const nameOfVariant: string = caseData.variant;

					if(finalObject[nameOfLocation] === undefined){
						finalObject[nameOfLocation] = {};
					}
					if(finalObject[nameOfLocation][nameOfVariant] === undefined){
						finalObject[nameOfLocation][nameOfVariant] = {};
					}

					finalObject[nameOfLocation][nameOfVariant] = { 
						...finalObject[nameOfLocation][nameOfVariant],
						numberOfSequences:caseData.numberOfSequences,
						percentageOfSequences:caseData.percentageOfSequences,
						totalOfSequencesNumbers: caseData.totalOfSequencesNumbers
					};
					
				});
				res.status(200).send({data: [finalObject]});
			});
	} catch (error){
		console.log('sumOfCasesUntilDate error: ', error);
		if(error === 'notFound'){
			console.log('sumOfCasesUntilDate: nothing was found');
			res.status(404).send({message: 'Your request returned no results'});
			return;
		}
		if(error === 'invalidDate'){
			console.log('sumOfCasesUntilDate: a invalid date was provided');
			res.status(400).send({message: 'Please send a valid dateformat (YYYY/MM/DD)'});
			return;
		}
		console.log('sumOfCasesUntilDate error: the server didnt know how to handle the error.');
		res.status(500).send({message: 'Internal server error'});
	}
}