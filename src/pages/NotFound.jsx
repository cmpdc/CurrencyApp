import { NavigationBar } from "../components/NavigationBar";
import dashboardStyles from "../styles/Dashboard.module.scss";
import notFoundStyles from "../styles/NotFound.module.scss";
import { classNames } from "../utils/classNames";

export const NotFoundPage = () => {
	return (
		<>
			<NavigationBar />
			<div className={dashboardStyles["container"]}>
				<section className={classNames(dashboardStyles["container-section"])}>
					<div className={notFoundStyles["component"]}>
						<h1>404 Not Found</h1>
					</div>
				</section>
			</div>
		</>
	);
};
