import { useContext, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../context/AppContext";
import { useModal } from "../context/ModalContext";
import styles from "../styles/AddItemForm.module.scss";
import { classNames } from "../utils/classNames";

const AddItemForm = ({ props = null }) => {
	const { dispatch } = useContext(AppContext);
	const { hideModal } = useModal();

	const [name, setName] = useState("");
	const [type, setType] = useState("");
	const [cost, setCost] = useState("");
	const [category, setCategory] = useState("");
	const [id, setId] = useState(null);
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		if (props) {
			setName(props.name);
			setType(props.type);
			setCost(props.cost);
			setCategory(props.category);
			setId(props.id);
			setDate(new Date(props.date));
		}
	}, [props]);

	const onSubmit = (event) => {
		event.preventDefault();

		if (!type) return;

		const payload = {
			name,
			type,
			cost: parseInt(cost),
			category,
			date: date.toISOString(),
		};

		if (props) {
			dispatch({
				type: "UPDATE_ITEM",
				payload: { ...payload, id: id },
			});

			hideModal(); // hide modal here
		} else {
			dispatch({
				type: "ADD_ITEM",
				payload: { ...payload, id: uuidv4() },
			});

			// clearing form or when navigating away from this component
			setName("");
			setCost("");
			setType("");
			setCategory("");
			setId(null);
		}
	};

	return (
		<div className={styles["formContainer"]}>
			<div className={styles["row"]}>
				<div className={styles["divide"]}>
					<label htmlFor="date">Date</label>
					<ReactDatePicker
						selected={date}
						onChange={(date) => setDate(date)}
						dateFormat="MMMM d, yyyy"
						className={styles["form-control"]}
					/>
				</div>
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
						disabled={!type}
						onChange={(event) => setName(event.target.value)}
					/>
				</div>
			</div>
			<div className={styles["row"]}>
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
				<div className={styles["divide"]}>
					<label htmlFor="cost">Category</label>
					<input
						type="text"
						className={styles["form-control"]}
						id="category"
						value={category}
						onChange={(event) => setCategory(event.target.value)}
						disabled={!type}
					/>
				</div>
			</div>
			<div className={classNames(styles["row"], styles["single"])}>
				<button
					type="submit"
					className={classNames(styles["button"], styles["button-primary"])}
					disabled={!type}
					onClick={(e) => onSubmit(e)}
				>
					{props ? "Update" : "Save"}
				</button>
			</div>
		</div>
	);
};

export default AddItemForm;
