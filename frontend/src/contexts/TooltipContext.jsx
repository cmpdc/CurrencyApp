import { createContext, useContext, useEffect } from "react";
import tippy, { followCursor, roundArrow } from "tippy.js";
import "tippy.js/animations/scale-subtle.css";
import "tippy.js/dist/svg-arrow.css";
import "tippy.js/dist/tippy.css";

const TooltipContext = createContext();

export const useTooltip = () => useContext(TooltipContext);

export const TooltipProvider = ({ children }) => {
	useEffect(() => {
		const handleMouseOver = (event) => {
			const tooltipTarget = event.target.closest("[data-tippy-content]");
			if (tooltipTarget && !tooltipTarget._tippy) {
				tippy(tooltipTarget, {
					content: () => tooltipTarget.getAttribute("data-tippy-content"),
					allowHTML: true,
				});
			}
		};

		document.body.addEventListener("mouseover", handleMouseOver, true);

		return () => {
			document.body.removeEventListener("mouseover", handleMouseOver, true);
		};
	}, []);

	const showTooltip = ({ content, elementRef, ...config }) => {
		if (elementRef && elementRef.current) {
			elementRef.current.setAttribute("data-tippy-content", content);
			if (!elementRef.current._tippy) {
				tippy(elementRef.current, {
					content: content,
					animation: "scale-subtle",
					inertia: true,
					arrow: roundArrow,
					interactiveBorder: 30,
					offset: [0, 10],
					plugins: [followCursor],
					appendTo: () => document.body,
					...config,
				});
			} else {
				elementRef.current._tippy.setProps({
					content: () => content,
					...config,
				});

				elementRef.current._tippy.show();
			}
		}
	};

	const hideTooltip = ({ elementRef }) => {
		if (elementRef && elementRef.current && elementRef.current._tippy) {
			elementRef.current._tippy.hide();
		}
	};

	return <TooltipContext.Provider value={{ showTooltip, hideTooltip }}>{children}</TooltipContext.Provider>;
};
