import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import { ModalProvider } from "./context/ModalContext";
import { TooltipProvider } from "./context/TooltipContext";
import "./styles/_all.scss";

ReactDOM.render(
	<React.StrictMode>
		<AppProvider>
			<ModalProvider>
				<TooltipProvider>
					<App />
				</TooltipProvider>
			</ModalProvider>
		</AppProvider>
	</React.StrictMode>,
	document.getElementById("root"),
);
