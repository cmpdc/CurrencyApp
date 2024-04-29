import { Button, FormLabel, Input, Option, Select } from "@mui/joy";
import { forwardRef, useContext, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarDay } from "react-icons/fa";
import { NumericFormat } from "react-number-format";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../contexts/AppContext";
import { useModal } from "../contexts/ModalContext";
import styles from "../styles/AddItemForm.module.scss";
import { classNames } from "../utils/classNames";
import { DEFAULT_BASE_CURRENCY, SELECTED_BASE_CURRENCY_KEY } from "../utils/constants";
import { CurrencySelectorForm } from "./CurrencySelectorForm";

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

	const [selectedBaseCurrency, setSelectedBaseCurrency] = useState(() => {
		return JSON.parse(localStorage.getItem(SELECTED_BASE_CURRENCY_KEY)) || DEFAULT_BASE_CURRENCY;
	});

	useEffect(() => {
		if (props) {
			setName(props.name);
			setType(props.type);
			setAmount(props.amount);
			setSelectedBaseCurrency(props.currency);
			setCategory(props.category);
			setId(props.id);
			setDate(new Date(props.date));
		}
	}, [props, setSelectedBaseCurrency]);

	const onSubmit = (event) => {
		event.preventDefault();

		if (!type) return;

		const payload = {
			name,
			type,
			amount: parseInt(amount),
			currency: Array.isArray(selectedBaseCurrency) ? selectedBaseCurrency[0] : selectedBaseCurrency,
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
						dateFormat="MMMM d, yyyy h:mm aa"
						className={styles["calendar-input"]}
						customInput={<Input required={true} className={styles["form-control"]} />}
						icon={<FaCalendarDay color="#000000" style={{ zIndex: 999 }} className={styles["calendar-button-icon"]} />}
						showIcon
						showTimeInput
					/>
				</div>
				<div className={styles["divide"]}>
					<FormLabel htmlFor="type">Type</FormLabel>
					<Select
						required={true}
						className={styles["form-control"]}
						id="type"
						value={type}
						placeholder={"Select data type"}
						onChange={(event, newValue) => {
							setType(newValue);
						}}
					>
						<Option value="expense" style={{ userSelect: "none" }}>
							Expense
						</Option>
						<Option value="income" style={{ userSelect: "none" }}>
							Income
						</Option>
					</Select>
				</div>
				<div className={styles["divide"]}>
					<FormLabel htmlFor="name">Name</FormLabel>
					<Input
						required={true}
						type="text"
						className={classNames(styles["form-control"], {
							[styles["form-control-disabled"]]: !type,
						})}
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
						required={true}
						className={classNames(styles["form-control"], {
							[styles["form-control-disabled"]]: !type,
						})}
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
					<FormLabel htmlFor="currency">Currency</FormLabel>
					<CurrencySelectorForm
						headerTitle={null}
						width={null}
						height={"38px"}
						allowMultipleSelection={false}
						initialCurrencies={selectedBaseCurrency}
						disabled={!type}
						onSave={null}
						onCurrencyChange={(newBaseCurrency) => {
							setSelectedBaseCurrency(() => {
								return newBaseCurrency;
							});
						}}
					/>
				</div>
				<div className={styles["divide"]}>
					<FormLabel htmlFor="category">Category</FormLabel>
					<Input
						type="text"
						className={classNames(styles["form-control"], {
							[styles["form-control-disabled"]]: !type,
						})}
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
