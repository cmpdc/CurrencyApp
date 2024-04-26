import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/ModalContext.module.scss";
import { classNames } from "../utils/classNames";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [modalContent, setModalContent] = useState(null);
	const [modalKey, setModalKey] = useState(null);
	const [modalClassName, setModalClassName] = useState("");

	const exitTimeInterval = 50;

	const showModal = ({ content, onShow, className }) => {
		setModalContent(content);
		setModalKey(Date.now());
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

		setTimeout(() => {
			setModalContent(null);
			setModalKey(null);
		}, exitTimeInterval);
	};

	const backdropVariants = {
		hidden: { opacity: 0, transition: { duration: 0.1 } },
		visible: { opacity: 1, transition: { duration: 0.1 } },
	};

	const modalVariants = {
		hidden: { opacity: 0, scale: 0.9, transition: { duration: 0.1, type: "spring" } },
		visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 25 } },
	};

	const renderModal = () => {
		return ReactDOM.createPortal(
			<AnimatePresence>
				{modalKey && (
					<motion.div
						key={modalKey}
						className={classNames(styles["modal"])}
						id="modal"
						animate={isVisible ? "visible" : "hidden"}
						exit="hidden"
					>
						<motion.div className={styles["modal-backdrop"]} onClick={hideModal} variants={backdropVariants}></motion.div>
						<motion.div
							className={classNames(styles["modal-inner"], modalClassName)}
							variants={modalVariants}
							initial="hidden"
							animate={isVisible ? "visible" : "hidden"}
							exit="hidden"
							key={modalKey}
						>
							{modalContent}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>,
			document.getElementById("root"),
		);
	};

	return (
		<ModalContext.Provider value={{ showModal, hideModal }}>
			{children}
			{renderModal()}
		</ModalContext.Provider>
	);
};
