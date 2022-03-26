export default function rateLimit(req, res, next) {
	console.log(req.headers.cookie);
	let lastRequest = req.headers.cookie
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
//# sourceMappingURL=rateLimit.js.map
