// ToastContext.tsx
import { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext(undefined);

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) throw new Error("useToast must be used within a ToastProvider");

	return context;
};

export const ToastProvider = ({ children }) => {
	const notify = (message, options) => {
		toast(message, options);
	};

	return (
		<ToastContext.Provider value={{ notify }}>
			{children}
			<ToastContainer position="bottom-right" newestOnTop />
		</ToastContext.Provider>
	);
};
