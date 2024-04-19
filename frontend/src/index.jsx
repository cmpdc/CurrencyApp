import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";
import { TooltipProvider } from "./context/TooltipContext";
import "./styles/_all.scss";

ReactDOM.render(
	<React.StrictMode>
		<AppProvider>
			<AuthProvider>
				<ModalProvider>
					<TooltipProvider>
						<App />
					</TooltipProvider>
				</ModalProvider>
			</AuthProvider>
		</AppProvider>
	</React.StrictMode>,
	document.getElementById("root"),
);
