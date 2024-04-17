import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import { ModalProvider } from "./context/ModalContext";
import "./styles/_all.scss";

ReactDOM.render(
	<React.StrictMode>
		<AppProvider>
			<ModalProvider>
				<App />
			</ModalProvider>
		</AppProvider>
	</React.StrictMode>,
	document.getElementById("root"),
);
