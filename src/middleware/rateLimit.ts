import Express from 'express';

export default function rateLimit(
	req: Express.Request,
	res: Express.Response,
	next: Express.NextFunction
) {
	console.log(req.headers.cookie);
	let lastRequest: any = req.headers.cookie
		?.split('x-last-request-time=')[1]
		?.split(';')[0];
	const currentTime = Date.now();
	lastRequest = parseInt(lastRequest, 10);
	const timeDifference = currentTime - lastRequest;
	if (timeDifference < 1000) {
		req.increment = false;
	} else {
		req.increment = true;
	}
	res.cookie('x-last-request-time', Date.now() + 1000);
	next();
}
