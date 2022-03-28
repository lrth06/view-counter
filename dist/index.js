import Express from 'express';
import app from './App.js';
import path from 'path';
import cors from 'cors';
import { router } from './routes/renderers.js';
import compression from 'compression';
import redis from './lib/redis.js';
import asyncLogger from './middleware/asyncLogger.js';
const port = process.env.PORT;
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.use(asyncLogger);
app.use('/', router);
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'public/favicon.ico'));
});
app.get('/*', (req, res) => {
    res.setHeader('status', '404');
    res.status(404).send(`<head><title>404</title></head><body>404: ${req.url}, That's an error.</body>`);
});
app.listen(port, async () => {
    try {
        await redis.set('test', 'test');
        await redis.get('test');
        await redis.del('test');
        process.stdout.write(`Successfully connected to Redis at ${process.env.REDIS_URI}\n`);
    }
    catch (e) {
        process.stderr.write('Error Connecting to Redis ❌\n');
        process.exit(1);
    }
    process.stdout.write(`Server started on port ${port} ✔️\n`);
    process.stdout.write(`Started at ${new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
    })} EST ⏱️\n`);
    if (process.env.NODE_ENV !== 'production') {
        process.stdout.write('Routes:\n');
        console.table(router.stack.map(({ route }) => ({
            method: route.stack[0].method,
            path: route.path,
            middleware: route.stack.length > 1 ? route.stack[0].name : 'N/A',
            handler: route.stack.length > 1
                ? route.stack[1].handle.name
                : route.stack[0].handle.name,
        })));
    }
});
app.on('error', (err) => {
    process.stderr.write(`Server error: ${err.message} ❌\n`);
});
process.on('SIGINT', () => {
    process.stdout.write('Gracefully shutting down from SIGINT (Ctrl-C)\n');
    process.exit();
});
process.on('SIGTERM', () => {
    process.stdout.write('Gracefully shutting down from SIGTERM\n');
    process.exit();
});
process.on('exit', () => {
    process.stdout.write(`Shutdown at ${new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
    })} EST ⏱️\n`);
    process.stdout.write('Goodbye!\n');
    process.exit();
});
//# sourceMappingURL=index.js.map