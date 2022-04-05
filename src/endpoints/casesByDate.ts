import { isValid } from 'date-fns';
import { Request, Response } from 'express';
import connection from '../connection';
import {  covidDatabaseResponseStructure } from '../typesAndIntefaces';

export default async function casesByDate (
	req: Request,
	res: Response
): Promise<void> {
	try {
		const { date } = req.params;

		if (typeof date !== 'string' || date.length !== 10 || !isValid(new Date(date))){
			throw 'invalidDate';
		}
		await connection.raw(`
			SELECT  location, variant, num_sequences as "numberOfSequences", perc_sequences as "percentageOfSequences", num_sequences_total as "totalOfSequencesNumbers" 
			FROM covid_cases_by_date 
			WHERE covid_cases_by_date.date = "${date}" 
			GROUP BY location, variant
			ORDER BY covid_cases_by_date.location ASC;
		`)
			.then((data:[covidDatabaseResponseStructure[]]) => {
				const finalObject: any = {} ;

				if(!data[0].length){
					throw 'notFound';
				}

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
		console.log('casesByDate error: ', error);
		if(error === 'notFound'){
			console.log('casesByDate: nothing was found');
			res.status(404).send({message: 'No data was found for the requested date. Please try another date.'});
			return;
		}
		if(error === 'invalidDate'){
			console.log('casesByDate: a invalid date was provided');
			res.status(400).send({message: 'Please send a valid dateformat (YYYY/MM/DD)'});
			return;
		}
		console.log('casesByDate error: the server didnt know how to handle the error.');
		res.status(500).send({message: 'Internal server error'});
	}
}