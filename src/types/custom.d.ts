declare namespace Express {
	export interface Request {
		increment?: boolean;
		setHeader(name: string, value: string): void;
		headers: {
			customHeader?: string;
		};
	}
	export interface Response {
		headers: {
			xRateLimitLimit?: string;
			xRateLimitRemaining?: string;
			xRateLimitReset?: string;
		};
	}
}
