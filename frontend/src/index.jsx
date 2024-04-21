import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";
import { ToastProvider } from "./context/ToastContext";
import { TooltipProvider } from "./context/TooltipContext";
import "./styles/_all.scss";

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<AppProvider>
			<AuthProvider>
				<TooltipProvider>
					<ToastProvider>
						<ModalProvider>
							<App />
						</ModalProvider>
					</ToastProvider>
				</TooltipProvider>
			</AuthProvider>
		</AppProvider>
	</React.StrictMode>,
);
