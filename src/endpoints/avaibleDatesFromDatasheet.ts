import { Request, Response } from 'express';
import connection from '../connection';
import { format } from 'date-fns';

export default async function avaibleDatesFromDatasheet (
	req: Request,
	res: Response
): Promise<void> {
	try {
		await connection.raw(`
		SELECT  date
		FROM covid_cases_by_date 
		GROUP BY date
		ORDER BY covid_cases_by_date.date ASC;
		`)
			.then((data) => {
				if(!data[0].length){
					throw 'emptyAnswer';
				}
				const formatedDataArray  = data[0].map((date: {date: any})=>{
					return format(date.date, 'yyyy-MM-dd');
				});
				res.status(200).send({avaibleDates: formatedDataArray});
			}).catch((error)=>{
				throw error;
			});
	} catch (error){
		console.log('avaibleDatesFromDatasheet error: ', error);
		if(error == 'emptyAnswer'){
			console.log('avaibleDatesFromDatasheet: nothing was found');
			res.status(404).send({message: 'Database error. Request returned no results'});
			return;
		}
		res.status(500).send({message: 'Internal server error'});
	}
}