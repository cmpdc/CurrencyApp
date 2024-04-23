import { useEffect, useState } from "react";
import { FaExchangeAlt, FaSignOutAlt } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import { HiCog } from "react-icons/hi";
import { TiHome } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../contexts/ModalContext";
import accountSettingsStyles from "../styles/AccountSettings.module.scss";
import styles from "../styles/NavigationBar.module.scss";
import { classNames } from "../utils/classNames";
import { AccountSettings } from "./AccountSettings";

const links = [
	{ link: "/dashboard", name: "Home", icon: <TiHome /> },
	{ link: "/currency", name: "Currency", icon: <FaExchangeAlt /> },
	{ link: "/assets", name: "Assets", icon: <GiTwoCoins /> },
	{ link: "/account", name: "Settings", icon: <HiCog /> },
	{ link: "/logout", name: "Logout", icon: <FaSignOutAlt /> },
];

export const NavigationBar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { showModal } = useModal();

	const [activeLink, setActiveLink] = useState("");
	const [hoveredItem, setHoveredItem] = useState(null);

	useEffect(() => {
		const path = location.pathname;
		if (path.startsWith("/assets")) {
			setActiveLink("/assets");
		} else {
			setActiveLink(path);
		}
	}, [location.pathname]);

	const handleClick = (link) => {
		if (link.replace("/", "") === "account") {
			showModal({
				content: <AccountSettings />,
				className: accountSettingsStyles["accountSettingsModal"],
			});

			return;
		}

		navigate(link);
		setActiveLink(link);
	};

	const handleMouseEnter = (index) => {
		setHoveredItem(index);
	};
	const handleMouseLeave = () => {
		setHoveredItem(null);
	};

	return (
		<>
			<aside className={styles["sidebar"]}>
				<ul className={styles["sidebarInner"]}>
					{links.map((itemElem, itemIndex) => {
						return (
							<li
								key={itemIndex}
								className={classNames(styles["navItem"], {
									[[styles["navItemClicked"]]]: itemElem.link === activeLink,
									[[styles["navItemHover"]]]: hoveredItem === itemIndex && itemElem.link !== activeLink,
									[[styles["navLogout"]]]: itemElem.name === "Logout",
								})}
								onClick={() => handleClick(itemElem.link)}
								onMouseEnter={() => handleMouseEnter(itemIndex)}
								onMouseLeave={handleMouseLeave}
							>
								{itemElem.icon && <span className={styles["icon"]}>{itemElem.icon}</span>}
								<h3>{itemElem.name}</h3>
							</li>
						);
					})}
				</ul>
			</aside>
		</>
	);
};
