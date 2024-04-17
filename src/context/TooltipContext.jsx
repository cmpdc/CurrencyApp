import { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom";

const defaultTooltipObj = { content: null, position: null };

const TooltipContext = createContext();

export const useTooltip = () => useContext(TooltipContext);

export const TooltipProvider = ({ children }) => {
	const [tooltip, setTooltip] = useState(defaultTooltipObj);

	const showTooltip = (content, targetElement) => {
		const rect = targetElement.getBoundingClientRect();
		setTooltip({
			content,
			position: {
				x: rect.x,
				y: rect.y,
				width: rect.width,
				height: rect.height,
				top: rect.top,
				right: rect.right,
				bottom: rect.bottom,
				left: rect.left,
			},
		});
	};

	const hideTooltip = () => {
		setTooltip({ content: null, position: { x: 0, y: 0 } });
	};

	return (
		<TooltipContext.Provider value={{ showTooltip, hideTooltip }}>
			{children}
			{tooltip.content &&
				ReactDOM.createPortal(
					<div
						style={{
							position: "fixed",
							top: tooltip.position.bottom,
							left: tooltip.position.x - tooltip.position.width / 2,
							zIndex: 1000,
							backgroundColor: "white",
							border: "1px solid black",
							padding: "8px",
						}}
						id={`tooltip`}
					>
						{tooltip.content}
					</div>,
					document.getElementById("root"),
				)}
		</TooltipContext.Provider>
	);
};
