import app from './App.js';
import request from 'supertest';

app.get('/', (req: any, res: { send: (arg0: string) => void }) => {
	if (!req) return;
	const name = 'Dev';
	res.send(`Hello ${name}!\r\n`);
});

app.get('/test', (req: any, res: { send: (arg0: string) => void }) => {
	if (!req) return;
	res.send('test');
});

request(app)
	.get('/')
	.expect(200)
	.expect('Hello Dev!\r\n')
	.end(function (err: any) {
		if (err) throw err;
		console.log('Test 1 passed!');
	});

request(app)
	.get('/test')
	.expect(200)
	.expect('test')
	.end(function (err: any) {
		if (err) throw err;
		console.log('Test 2 passed!');
	});
