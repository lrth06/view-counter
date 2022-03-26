import standardTemplate from '../templates/standard.js';
import client from '../lib/redis.js';
export default async function standardController(req, res) {
    const user = req.query.user || 'Example';
    try {
        res.setHeader('Cache-Control', 'max-age=10s');
        res.set({ 'content-type': 'image/svg+xml; charset=utf-8' });
        res.setHeader('Content-Security-Policy', 'img-src data:');
        const exists = await client.get(user.toLowerCase());
        if (exists) {
            await client.set(user.toLowerCase(), 1);
        }
        if (req.increment) {
            await client.incr(user.toLowerCase());
        }
        const newValue = await client.get(user.toLowerCase());
        res.send(standardTemplate({
            text: req.query.text?.toString() || 'fff',
            number: exists ? newValue?.toString() : '1',
            base: req.query.base?.toString() || '97CA00',
            accent: req.query.accent?.toString() || '007ec6',
            icon: req.query.icon?.toString() || 'false',
        }));
    }
    catch (err) {
        console.log(err);
    }
}
//# sourceMappingURL=renderController.js.map