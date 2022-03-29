import Express from 'express';
import { Logging } from '@google-cloud/logging';
const logging = new Logging();

export default async function asyncLogger(
	req: Express.Request,
	res: Express.Response,
	next: Express.NextFunction
) {
	// // Selects the log to write to
	const log = logging.log('view-counter-log');

	const dataObject = {
		method: req.method,
		url: req.url,
		status: res.statusCode,
		headers: { ...req.headers },
		body: { ...req.body },
		query: { ...req.query },
		ip: req.ip,
		userAgent: req.get('User-Agent'),
		timestamp: new Date().toISOString(),
	};

	// const text = `${dataObject}`;

	// The metadata associated with the entry
	const metadata = {
		resource: { type: 'global' },
		severity: 'INFO',
	};

	// Prepares a log entry
	const entry = log.entry(metadata, dataObject);

	async function writeLog() {
		// Writes the log entry
		await log.write(entry);
	}
	try {
		await writeLog();
		next();
	} catch (e) {
		process.stderr.write('Error writing to log ❌\n');
		next();
	}
}
