import { Request, Response } from 'express';
import connection from '../connection';
import {  covidDataStructure } from '../typesAndIntefaces';

export default async function casesByDate (
	req: Request,
	res: Response
): Promise<any> {
	try {
		const { date } = req.params;
		const timestamp: any = Date.parse( date );

		if (date.length !== 10&& isNaN(timestamp) === false ){
			return res.status(500).send('Error: Please send a valid date!');
		}

		await connection.raw(`
		SELECT  location as location, variant as variant, num_sequences as "numberOfSequences", perc_sequences as "percentageOfSequences", num_sequences_total as "totalOfSequencesNumbers" 
		FROM covid_cases_by_date 
		WHERE covid_cases_by_date.date = "${date}" 
		GROUP BY location, variant
		ORDER BY covid_cases_by_date.location ASC;
		`)
			.then((data:[covidDataStructure[]]) => {
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
				res.status(200).send([finalObject]);
			});
	} catch (error){
		res.status(200).send(`error: ${error}`);
	}
}