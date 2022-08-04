import React from "react";

function Icon(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="18"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			className={props.className}
			viewBox="0 0 24 24"
		>
			<path d="M12 5L12 19"></path>
			<path d="M19 12L12 19 5 12"></path>
		</svg>
	);
}

export default Icon;
