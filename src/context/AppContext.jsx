import { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

export const AppReducer = (state, action) => {
	switch (action.type) {
		case "ADD_ITEM":
			return {
				...state,
				data: [...state.data, { ...action.payload, id: uuidv4() }],
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
			return state;
	}
};

const initialState = {
	budget: 2000,
	data: [
		{ id: uuidv4(), name: "Sanderson Factory", cost: 1040, type: "income" },
		{ id: uuidv4(), name: "Shopping", cost: 50, type: "expense" },
		{ id: uuidv4(), name: "Holiday", cost: 300, type: "expense" },
		{ id: uuidv4(), name: "Side Hustle", cost: 120, type: "income" },
		{ id: uuidv4(), name: "Transportation", cost: 70, type: "expense" },
		{ id: uuidv4(), name: "Fuel", cost: 40, type: "expense" },
		{ id: uuidv4(), name: "Child Care", cost: 500, type: "expense" },
	],
};

export const AppContext = createContext();

export const AppProvider = (props) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	return (
		<AppContext.Provider
			value={{
				data: state.data,
				budget: state.budget,
				dispatch,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};
