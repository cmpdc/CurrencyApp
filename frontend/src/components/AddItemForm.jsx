import { Button, FormLabel, Input, Option, Select } from "@mui/joy";
import { forwardRef, useContext, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NumericFormat } from "react-number-format";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../context/AppContext";
import { useModal } from "../context/ModalContext";
import styles from "../styles/AddItemForm.module.scss";
import { classNames } from "../utils/classNames";

const NumericFormatAdapter = forwardRef(function NumericFormatAdapter(props, ref) {
	const { onChange, ...other } = props;

	return (
		<NumericFormat
			{...other}
			getInputRef={ref}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			}}
			thousandSeparator
			valueIsNumericString
		/>
	);
});

const AddItemForm = ({ props = null }) => {
	const { dispatch } = useContext(AppContext);
	const { hideModal } = useModal();

	const [name, setName] = useState("");
	const [type, setType] = useState("");
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState("");
	const [id, setId] = useState(null);
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		if (props) {
			setName(props.name);
			setType(props.type);
			setAmount(props.amount);
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
			amount: parseInt(amount),
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
			setAmount("");
			setType("");
			setCategory("");
			setId(null);
		}
	};

	const onCancel = (event) => {
		event.preventDefault();

		hideModal();
	};

	return (
		<div className={styles["formContainer"]}>
			<div className={styles["row"]}>
				<div className={styles["divide"]}>
					<FormLabel htmlFor="date">Date</FormLabel>
					<ReactDatePicker
						selected={date}
						onChange={(date) => setDate(date)}
						dateFormat="MMMM d, yyyy"
						className={styles["form-control"]}
						showTimeSelect
					/>
				</div>
				<div className={styles["divide"]}>
					<FormLabel htmlFor="type">Type</FormLabel>
					<Select
						required="required"
						className={styles["form-control"]}
						id="type"
						value={type}
						placeholder={"Select data type"}
						onChange={(event, newValue) => {
							setType(newValue);
						}}
					>
						<Option value="expense">Expense</Option>
						<Option value="income">Income</Option>
					</Select>
				</div>
				<div className={styles["divide"]}>
					<FormLabel htmlFor="name">Name</FormLabel>
					<Input
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
					<FormLabel htmlFor="amount">{type === "expense" ? "Cost" : "Amount"}</FormLabel>
					<Input
						required="required"
						className={styles["form-control"]}
						id="amount"
						value={amount}
						onChange={(event) => setAmount(event.target.value)}
						disabled={!type}
						slotProps={{
							input: {
								component: NumericFormatAdapter,
							},
						}}
					/>
				</div>
				<div className={styles["divide"]}>
					<FormLabel htmlFor="category">Category</FormLabel>
					<Input
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
				<Button
					type="submit"
					className={classNames(styles["button"], styles["button-primary"])}
					disabled={!type}
					onClick={(e) => {
						onSubmit(e);
					}}
					variant="solid"
					size="sm"
				>
					{props ? "Update" : "Save"}
				</Button>
				<Button
					type="cancel"
					className={classNames(styles["button"], styles["button-cancel"])}
					onClick={(e) => {
						onCancel(e);
					}}
					variant="outline"
					size="sm"
				>
					Cancel
				</Button>
			</div>
		</div>
	);
};

export default AddItemForm;
