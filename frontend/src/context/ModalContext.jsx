import { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/ModalContext.module.scss";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [modalContent, setModalContent] = useState(null);

	const showModal = (content) => {
		setModalContent(content);
		setIsVisible(true);
	};

	const hideModal = () => {
		setIsVisible(false);
		setModalContent(null);
	};

	const renderModal = () => {
		return isVisible
			? ReactDOM.createPortal(
					<>
						<div className={styles["modal"]} id="modal">
							<div className={styles["modal-backdrop"]} onClick={hideModal}></div>
							<div className={styles["modal-inner"]}>{modalContent}</div>
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
