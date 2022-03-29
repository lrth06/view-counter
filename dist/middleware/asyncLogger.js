import { Logging } from '@google-cloud/logging';
const logging = new Logging();
export default async function asyncLogger(req, res, next) {
    const log = logging.log('view-counter-log');
    const dataObject = {
        method: req.method,
        url: req.url,
        status: res.statusCode,
        headers: { ...req.headers },
        body: { ...req.body },
        query: { ...req.query },
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        timestamp: new Date().toISOString(),
    };
    const metadata = {
        resource: { type: 'global' },
        severity: 'INFO',
    };
    const entry = log.entry(metadata, dataObject);
    async function writeLog() {
        await log.write(entry);
    }
    try {
        await writeLog();
        next();
    }
    catch (e) {
        process.stderr.write('Error writing to log ❌\n');
        next();
    }
}
//# sourceMappingURL=asyncLogger.js.map