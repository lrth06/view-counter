import Express from 'express';
import app from './App.js';
import path from 'path';
import cors from 'cors';
import { router } from './routes/renderers.js';
import redis from './lib/redis.js';
const port = process.env.PORT || 3000;
app.use(Express.json());
app.use(cors());
app.use('/', router);
app.get('/favicon.ico', (req, res) => {
	res.sendFile(path.join(path.resolve(), 'public/favicon.ico'));
});
app.get('/*', (req, res) => {
	res.sendFile(path.join(path.resolve(), 'public/404.html'));
});
app.listen(port, async () => {
	try {
		await redis.set('test', 'test');
		const test = await redis.get('test');
		console.log(test);
	} catch (e) {
		process.stderr.write('Error');
	}
	process.stdout.write(`Server started on port ${port} ✔️\n`);
	process.stdout.write(`Started at ${new Date()} ⏱️\n`);
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
app.on('error', (err) => {
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
//# sourceMappingURL=index.js.map
