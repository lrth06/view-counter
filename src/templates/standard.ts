type propType = {
	user: string;
	text: string;
	number: string | undefined;
	base: string;
	accent: string;
	icon: boolean;
	flat: boolean;
};

function darken(color: string, percent: number) {
	const num = parseInt(color.replace('#', ''), 16),
		amt = Math.round(2.55 * percent),
		R = (num >> 16) + amt,
		B = ((num >> 8) & 0x00ff) + amt,
		G = (num & 0x0000ff) + amt;
	return (
		'#' +
		(
			0x1000000 +
			(R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
			(B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
			(G < 255 ? (G < 1 ? 0 : G) : 255)
		)
			.toString(16)
			.slice(1)
	);
}

export default function standardTemplate(props: propType) {
	function offsetText() {
		if (props.number) {
			if (parseInt(props.number, 10) < 10) {
				return '22';
			}
			if (
				parseInt(props.number, 10) >= 10 &&
				parseInt(props.number) < 100
			) {
				return '18';
			}
			if (
				parseInt(props.number) >= 100 &&
				parseInt(props.number) < 1000
			) {
				return '14';
			}
			if (
				parseInt(props.number) >= 100 &&
				parseInt(props.number) < 1000
			) {
				return '11';
			}
			if (
				parseInt(props.number) >= 1000 &&
				parseInt(props.number) < 10000
			) {
				return '10';
			}
			if (
				parseInt(props.number) >= 10000 &&
				parseInt(props.number) < 100000
			) {
				return '8';
			}
			if (
				parseInt(props.number) >= 100000 &&
				parseInt(props.number) < 999999
			) {
				return '4';
			}
			if (parseInt(props.number) > 999999) {
				return '16';
			}
		}
	}

	function isFlat(section: string) {
		if (props.flat != true) {
			return `<stop stop-color="${darken(section, 20)}"
      offset="0%"/>`;
		}
		return null;
	}

	const itsOverAMillion =
		props.number && parseInt(props.number) < 999999 ? props.number : '1M+';

	const icon =
		props.icon == true
			? `<svg x="22"><path dominant-baseline="middle" fill="${props.text}" d="M10 7.5a2.5 2.5 0 1 0 2.5 2.5A2.5 2.5 0 0 0 10 7.5zm0 7a4.5 4.5 0 1 1 4.5-4.5 4.5 4.5 0 0 1-4.5 4.5zM10 3C3 3 0 10 0 10s3 7 10 7 10-7 10-7-3-7-10-7z"/></svg>`
			: `<text fill="${darken(props.text, 8)}"
              fill-opacity=".2">
        <tspan x="15" y="15" aria-hidden="true">Views</tspan>
      </text>
      <text fill="${props.text}">
        <tspan x="15" y="14.5">Views</tspan>
      </text>`;
	return `<svg xmlns="http://www.w3.org/2000/svg" width="115" height="20">
  <title>${props.user} - ${props.number} Views</title>
  <defs>
    <linearGradient id="text-fill" x1="50%" y1="0%" x2="50%" y2="100%">
      ${isFlat(props.base)}
      <stop stop-color="${props.base}" offset="100%"/>
    </linearGradient>
    <linearGradient id="count-fill" x1="50%" y1="0%" x2="50%" y2="100%">
      ${isFlat(props.accent)}
      <stop stop-color="${props.accent}" offset="100%"/>
    </linearGradient>
  </defs>
   <g fill="none" fill-rule="evenodd">
    <g font-family="'DejaVu Sans',Verdana,Geneva,sans-serif" font-size="11">
      <path id="workflow-bg" d="M0,3 C0,1.3431 1.3552,0 3.02702703,0 L65,0 L65,20 L3.02702703,20 C1.3552,20 0,18.6569 0,17 L0,3 Z" fill="url(#text-fill)" fill-rule="nonzero"/>
      ${icon}
    </g>
    </g>
    <g transform="translate(65)" font-family="'DejaVu Sans',Verdana,Geneva,sans-serif" font-size="11">
      <path d="M0 0h46.939C48.629 0 50 1.343 50 3v14c0 1.657-1.37 3-3.061 3H0V0z" id="state-bg" fill="url(#count-fill)" fill-rule="nonzero"/>
      <text fill="${darken(props.text, 8)}"
      fill-opacity=".2" aria-hidden="true">
        <tspan x="${offsetText()}" y="15">${itsOverAMillion}</tspan>
      </text>
      <text fill="${props.text}">
        <tspan x="${offsetText()}" y="14.5">${itsOverAMillion}</tspan>
      </text>
    </g>
</svg>`;
}
