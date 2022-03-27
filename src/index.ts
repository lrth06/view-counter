import Express from 'express';
import app from './App.js';
import path from 'path';
import cors from 'cors';
import { router } from './routes/renderers.js';
import compression from 'compression';
import redis from './lib/redis.js';
import { format, transports } from 'winston';
import { logger } from 'express-winston';
const port = process.env.PORT;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.use(
	logger({
		transports: [new transports.Console()],
		format: format.combine(format.colorize(), format.json()),
		meta: true,
		msg: 'HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}',
		expressFormat: true,
		colorize: false,
		ignoreRoute: function (req) {
			if (req.url === '/favicon.ico') {
				return true;
			}
			return false;
		},
	})
);
app.use('/', router);

app.get('/favicon.ico', (req: Express.Request, res: Express.Response) => {
	res.sendFile(path.join(path.resolve(), 'public/favicon.ico'));
});

app.get('/*', (req: Express.Request, res: Express.Response) => {
	res.setHeader('status', '404');
	res.status(404).send(
		`<head><title>404</title></head> <body>404: ${req.url}, That's an error.</body>`
	);
});

app.listen(port, async () => {
	try {
		await redis.set('test', 'test');
		await redis.get('test');
		await redis.del('test');
		process.stdout.write(
			`Successfully connected to Redis at ${process.env.REDIS_URI}\n`
		);
	} catch (e) {
		process.stderr.write('Error Connecting to Redis ❌\n');
		process.exit(1);
	}

	process.stdout.write(`Server started on port ${port} ✔️\n`);
	process.stdout.write(
		`Started at ${new Date().toLocaleString('en-US', {
			timeZone: 'America/New_York',
		})} EST ⏱️\n`
	);
	process.stdout.write('Routes:\n');
	console.table(
		router.stack.map(({ route }) => ({
			method: route.stack[0].method,
			path: route.path,
			middleware: route.stack.length > 1 ? route.stack[0].name : 'N/A',
			handler:
				route.stack.length > 1
					? route.stack[1].handle.name
					: route.stack[0].handle.name,
		}))
	);
});

app.on('error', (err: any) => {
	process.stderr.write(`Server error: ${err.message} ❌\n`);
});

process.on('SIGINT', () => {
	process.stdout.write('\nGracefully shutting down from SIGINT (Ctrl-C)\n');
	process.exit();
});

process.on('SIGTERM', () => {
	process.stdout.write('\nGracefully shutting down from SIGTERM\n');
	process.exit();
});

process.on('exit', () => {
	process.stdout.write('\nGoodbye!\n');
	process.exit();
});
