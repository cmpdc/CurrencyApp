// Formate date to "April 2024"
export const formatDate = (date) => {
	const d = new Date(date);
	return `${d.toLocaleString("default", { month: "long" })} ${d.getFullYear()}`;
};
