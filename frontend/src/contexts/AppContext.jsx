import { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

export const AppReducer = (state, action) => {
	switch (action.type) {
		case "ADD_ITEM":
			return {
				...state,
				data: [...state.data, { ...action.payload, id: uuidv4() }],
			};
		case "UPDATE_ITEM":
			return {
				...state,
				data: state.data.map((item) => (item.id === action.payload.id ? { ...item, ...action.payload } : item)),
			};
		case "DELETE_ITEM":
			return {
				...state,
				data: state.data.filter((item) => item.id !== action.payload),
			};
		case "SET_BUDGET":
			return {
				...state,
				budget: action.payload,
			};
		default:
			console.error(`${action.type} is undefined. Check codes.`);
			return state;
	}
};

const initialState = {
	budget: 2000,
	data: [
		{
			id: uuidv4(),
			date: "2024-01-15T05:59:51.380Z",
			name: "Sanderson Factory",
			category: "Hustle",
			amount: 1200,
			currency: "USD",
			type: "income",
		},
		{
			id: uuidv4(),
			date: "2024-02-01T06:00:57.526Z",
			name: "Shopping",
			category: "",
			amount: 50,
			currency: "USD",
			type: "expense",
		},
		{
			id: uuidv4(),
			date: "2024-03-05T06:01:19.680Z",
			name: "Holiday",
			category: "",
			amount: 300,
			currency: "USD",
			type: "expense",
		},
		{
			id: uuidv4(),
			date: "2024-04-01T06:02:39.832Z",
			name: "Side Hustle",
			category: "",
			amount: 120,
			currency: "USD",
			type: "income",
		},
		{
			id: uuidv4(),
			date: "2024-04-10T06:02:57.015Z",
			name: "Transportation",
			category: "",
			amount: 70,
			currency: "USD",
			type: "expense",
		},
		{
			id: uuidv4(),
			date: "2024-04-14T06:03:18.117Z",
			name: "Fuel",
			category: "",
			amount: 40,
			currency: "USD",
			type: "expense",
		},
		{
			id: uuidv4(),
			date: "2024-04-12T06:03:41.907Z",
			name: "Child Care",
			category: "Baby",
			amount: 500,
			currency: "USD",
			type: "expense",
		},
	],
	currencies: ["SAR", "PHP", "VND", "JPY"],
};

export const AppContext = createContext();

export const AppProvider = (props) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	return (
		<AppContext.Provider
			value={{
				data: state.data,
				budget: state.budget,
				currencies: state.currencies,
				dispatch,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};
