import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import styles from "../styles/AddItemForm.module.scss";
import { classNames } from "../utils/classNames";

const AddItemForm = (props) => {
	const { dispatch } = useContext(AppContext);

	const [name, setName] = useState("");
	const [cost, setCost] = useState("");
	const [type, setType] = useState("");

	const onSubmit = (event) => {
		if (!type) return;

		event.preventDefault();

		const item = {
			name,
			cost: parseInt(cost),
			type,
		};

		dispatch({
			type: "ADD_ITEM",
			payload: item,
		});

		setName("");
		setCost("");
		setType("");
	};

	return (
		<div className={styles["formContainer"]}>
			<div className={styles["row"]}>
				<div className={styles["divide"]}>
					<label htmlFor="type">Type</label>
					<select
						required="required"
						className={styles["form-control"]}
						id="type"
						value={type}
						onChange={(event) => setType(event.target.value)}
					>
						<option value="">Select Type</option>
						<option value="expense">Expense</option>
						<option value="income">Income</option>
					</select>
				</div>
				<div className={styles["divide"]}>
					<label htmlFor="name">Name</label>
					<input
						required="required"
						type="text"
						className={styles["form-control"]}
						id="name"
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
				</div>
				<div className={styles["divide"]}>
					<label htmlFor="cost">Cost</label>
					<input
						required="required"
						type="number"
						className={styles["form-control"]}
						id="cost"
						value={cost}
						onChange={(event) => setCost(event.target.value)}
						disabled={!type}
					/>
				</div>
			</div>
			<div className={styles["row"]}>
				<button
					type="submit"
					className={classNames(styles["button"], styles["button-primary"])}
					disabled={!type}
					onClick={(e) => onSubmit(e)}
				>
					Save
				</button>
			</div>
		</div>
	);
};

export default AddItemForm;
