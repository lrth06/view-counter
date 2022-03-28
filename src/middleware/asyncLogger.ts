import Express from 'express';
import { Logging } from '@google-cloud/logging';
export default async function asyncLogger(
	req: Express.Request,
	res: Express.Response,
	next: Express.NextFunction
) {
	function severity(): string {
		if (res.statusCode === 200) {
			return 'INFO';
		}
		if (res.statusCode === 404) {
			return 'WARNING';
		}
		if (res.statusCode === 500) {
			return 'ERROR';
		}
		return 'INFO';
	}
	if (process.env.NODE_ENV == 'production') {
		const logging = new Logging();
		const log = logging.log('view-counter-access');

		const metadata = {
			resource: { type: 'global' },
			severity: severity(),
		};
		const entry = log.entry(metadata, req);
		await log.write(entry);
	}
	next();
}
