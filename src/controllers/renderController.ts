import Express from 'express';
import standardTemplate from '../templates/standard.js';
import client from '../lib/redis.js';
import { toHex } from '../lib/colors.js';

export function convertToColor(color: string) {
	color = color.replace('#', '');
	const matches = /^(?:[0-9A-F]{3}|[0-9A-F]{6})$/i.test(color);

	if (!matches) {
		return `${toHex(color)}`;
	}
	return `#${color}`;
}

export default async function standardController(
	req: Express.Request,
	res: Express.Response
) {
	const user: any = req.query.user || 'Example';

	try {
		res.setHeader('Cache-Control', 'max-age=100s');
		res.set({
			'access-control-allow-origin': 'camo.githubusercontent.com',
			'access-control-allow-headers': '*',
			'access-control-allow-methods': 'GET',
			'content-type': 'image/svg+xml; charset=utf-8',
			'x-content-type-options': 'nosniff',
			'x-robots-tag': 'noindex, nofollow',
			'x-extension-type': 'svg',
			'x-powered-by': 'Magic',
		});
		res.set({ 'content-type': 'image/svg+xml; charset=utf-8' });
		res.setHeader('Content-Security-Policy', 'img-src data:');
		const exists = await client.get(user.toLowerCase());
		if (!exists) {
			await client.set(user.toLowerCase(), 1);
		}
		if (req.increment) {
			await client.incr(user.toLowerCase());
		}
		const newValue = await client.get(user.toLowerCase());
		res.send(
			standardTemplate({
				text: req.query.text
					? convertToColor(req.query.text.toString())
					: '#ffffff',
				number: exists ? newValue?.toString() : '1',
				base: req.query.base
					? convertToColor(req.query.base.toString())
					: '#28A745',
				accent: req.query.accent
					? convertToColor(req.query.accent.toString())
					: '#007ec6',
				icon: req.query.icon == 'true' ? true : false,
				user: user,
				flat: req.query.flat == 'true' ? true : false,
			})
		);
	} catch (err) {
		console.log(err);
	}
}
