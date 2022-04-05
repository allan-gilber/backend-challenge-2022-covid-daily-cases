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
				const formatedDataArray  = data[0].map((date: {date: any})=>{
					return format(date.date, 'yyyy/M/dd');
				});

				res.status(200).send({avaibleDates: formatedDataArray});
			}).catch((error)=>{
				console.log('avaibleDatesFromDatasheet: ', error);
			});
	} catch (error){
		res.status(500).send({ message: `Error: ${error}`});
	}
}