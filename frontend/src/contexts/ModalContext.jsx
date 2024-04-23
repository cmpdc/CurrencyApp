import { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/ModalContext.module.scss";
import { classNames } from "../utils/classNames";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [modalContent, setModalContent] = useState(null);
	const [modalClassName, setModalClassName] = useState("");

	const showModal = ({ content, onShow, className }) => {
		setModalContent(content);
		setIsVisible(true);

		if (className) {
			setModalClassName(className);
		}

		if (onShow) {
			onShow();
		}
	};

	const hideModal = () => {
		setIsVisible(false);
		setModalContent(null);
	};

	const renderModal = () => {
		return isVisible
			? ReactDOM.createPortal(
					<>
						<div className={classNames(styles["modal"])} id="modal">
							<div className={styles["modal-backdrop"]} onClick={hideModal}></div>
							<div className={classNames(styles["modal-inner"], modalClassName)}>{modalContent}</div>
						</div>
					</>,
					document.getElementById("root"),
				)
			: null;
	};

	return (
		<ModalContext.Provider
			value={{
				showModal,
				hideModal,
			}}
		>
			{" "}
			{children}
			{renderModal()}
		</ModalContext.Provider>
	);
};
