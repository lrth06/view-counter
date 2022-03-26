import Express from 'express';
import standardTemplate from '../templates/standard.js';
import client from '../lib/redis.js';

export default async function standardController(
	req: Express.Request,
	res: Express.Response
) {
	const user: any = req.query.user || 'Example';
	const eyeCon =
		req.query.icon == 'true'
			? '<svg x="15"><path dominant-baseline="middle" d="M10 7.5a2.5 2.5 0 1 0 2.5 2.5A2.5 2.5 0 0 0 10 7.5zm0 7a4.5 4.5 0 1 1 4.5-4.5 4.5 4.5 0 0 1-4.5 4.5zM10 3C3 3 0 10 0 10s3 7 10 7 10-7 10-7-3-7-10-7z"/></svg>'
			: `  <text fill="#010101" fill-opacity=".3" lengthAdjust="spacing" textLength="396.0" transform="scale(0.1)" x="258.0" y="150">Views</text>
  <text lengthAdjust="spacing" textLength="396.0" transform="scale(0.1)" x="258.0" y="140">Views</text>`;
	try {
		res.setHeader('Cache-Control', 'no-cache');
		res.set({ 'content-type': 'image/svg+xml; charset=utf-8' });
		res.setHeader('Content-Security-Policy', 'img-src data:');
		const exists = await client.get(user.toLowerCase());
		if (exists) {
			if (req.increment) {
				await client.incr(user.toLowerCase());
			}
			const newValue = await client.get(user.toLowerCase());
			res.send(
				standardTemplate({
					text: user,
					number: newValue?.toString(),
					base: req.query.base?.toString() || '97CA00',
					accent: req.query.accent?.toString() || '007ec6',
					icon: eyeCon,
				})
			);
		} else {
			await client.set(user.toLowerCase(), 1);
			res.send(
				standardTemplate({
					text: user,
					number: '1',
					base: req.query.base?.toString() || '97CA00',
					accent: req.query.accent?.toString() || '007ec6',
					icon: req.query.icon == 'true' ? eyeCon : 'Views',
				})
			);
		}
	} catch (err) {
		console.log(err);
	}
}
