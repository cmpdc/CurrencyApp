import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/NavigationBar.module.scss";
import { classNames } from "../utils/classNames";

const links = [
	{ link: "/dashboard", name: "Home" },
	{ link: "/currency", name: "Currency" },
	{ link: "/assets", name: "Assets" },
	{ link: "/account", name: "Settings" },
];

export const NavigationBar = () => {
	const navigate = useNavigate();
	const [activeLink, setActiveLink] = useState("");
	const [hoveredItem, setHoveredItem] = useState(null);

	const handleClick = (link) => {
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
			<nav className={styles["nav"]}>
				<ul className={styles["navInner"]}>
					{links.map((itemElem, itemIndex) => {
						return (
							<li
								key={itemIndex}
								className={classNames(styles["navItem"], {
									[[styles["navItemClicked"]]]: itemElem.link === activeLink,
									[[styles["navItemHover"]]]: hoveredItem === itemIndex && itemElem.link !== activeLink,
								})}
								onClick={() => handleClick(itemElem.link)}
								onMouseEnter={() => handleMouseEnter(itemIndex)}
								onMouseLeave={handleMouseLeave}
							>
								{itemElem.name}
							</li>
						);
					})}
				</ul>
			</nav>
		</>
	);
};
