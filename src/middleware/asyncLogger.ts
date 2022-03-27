import Express from 'express';
export default async function asyncLogger(
	req: Express.Request,
	res: Express.Response,
	next: Express.NextFunction
) {
	function logLevel() {
		if (req.query.logLevel) {
			return req.query.logLevel;
		}
		return 'INFO';
	}
	function headers() {
		return Object.entries(req.headers).map(
			([key, value]) => `${key}: ${value}`
		);
	}
	const logMessage = `{METHOD:'${req.method}' URL:${req.url} ${
		res.statusCode
	} {LEVEL:${logLevel()}}  {HEADERS: {${headers()}}}\n}`;
	await process.stdout.write(logMessage);
	next();
}
