type propType = {
	text: string;
	number: string | undefined;
	base: string;
	accent: string;
	icon: string;
};

export default function standardTemplate(props: propType) {
	return `<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" height="20" width="80.6">
    <linearGradient id="smooth" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
    </linearGradient>
    <clipPath id="round">
        <rect fill="#fff" height="20" rx="3" width="80.6"/>
    </clipPath>
    <g clip-path="url(#round)">
        <rect fill="#${props.base}" height="20" width="49.6"/>
        <rect fill="#${props.accent}" height="20" width="31.0" x="49.6"/>
        <rect fill="url(#smooth)" height="20" width="80.6"/>
    </g>
    <g fill="#fff" font-family="Arial,Helvetica,sans-serif" font-size="110" text-anchor="middle">
        ${props.icon}
        <text  transform="scale(0.1)" x="641.0" y="140">${props.number}</text>
    </g>
</svg>`;
}
