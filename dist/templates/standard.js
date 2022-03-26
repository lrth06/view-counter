export default function standardTemplate(props) {
    const icon = props.icon == 'true'
        ? '<svg x="15"><path dominant-baseline="middle" d="M10 7.5a2.5 2.5 0 1 0 2.5 2.5A2.5 2.5 0 0 0 10 7.5zm0 7a4.5 4.5 0 1 1 4.5-4.5 4.5 4.5 0 0 1-4.5 4.5zM10 3C3 3 0 10 0 10s3 7 10 7 10-7 10-7-3-7-10-7z"/></svg>'
        : `<text fill="#${props.text}" lengthAdjust="spacing" textLength="396.0" transform="scale(0.1)" x="258.0" y="140">Views</text>`;
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
    <g fill="#${props.text}" font-family="Arial,Helvetica,sans-serif" font-size="110" text-anchor="middle">
        ${icon}
        <text  transform="scale(0.1)" x="641.0" y="140">${props.number}</text>
    </g>
</svg>`;
}
//# sourceMappingURL=standard.js.map