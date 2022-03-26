import app from './App.js';
import request from 'supertest';
app.get('/', (req, res) => {
	if (!req) return;
	const name = 'Dev';
	res.send(`Hello ${name}!\r\n`);
});
app.get('/test', (req, res) => {
	if (!req) return;
	res.send('test');
});
request(app)
	.get('/')
	.expect(200)
	.expect('Hello Dev!\r\n')
	.end(function (err) {
		if (err) throw err;
		console.log('Test 1 passed!');
	});
request(app)
	.get('/test')
	.expect(200)
	.expect('test')
	.end(function (err) {
		if (err) throw err;
		console.log('Test 2 passed!');
	});
//# sourceMappingURL=index.test.js.map
