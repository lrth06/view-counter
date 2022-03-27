import Express from 'express';
import { Logging } from '@google-cloud/logging';
export default async function asyncLogger(
	req: Express.Request,
	res: Express.Response,
	next: Express.NextFunction
) {
	function headers() {
		return Object.entries(req.headers).map(
			([key, value]) => `${key}: ${value}`
		);
	}
	const logging = new Logging();
	const log = logging.log('view-counter-access');
	const text = `{METHOD:'${req.method}' URL:${req.url} ${
		res.statusCode
	} {HEADERS: {${headers()}}}\n}`;

	const metadata = {
		resource: { type: 'global' },
		severity: 'INFO',
	};
	const entry = log.entry(metadata, text);
	async function writeLog() {
		await log.write(entry);
		console.log(`Logged: ${text}`);
	}
	writeLog();

	next();
}
