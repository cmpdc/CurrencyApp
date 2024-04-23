import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AppProvider } from "./contexts/AppContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ModalProvider } from "./contexts/ModalContext";
import { ToastProvider } from "./contexts/ToastContext";
import { TooltipProvider } from "./contexts/TooltipContext";
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
