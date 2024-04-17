export const groupByCategoricalDate = (data) => {
	const groups = data.reduce((acc, item) => {
		const date = new Date(item.date);
		const year = date.getFullYear();
		const month = date.toLocaleString("default", { month: "long" });
		const yearMonth = `${month} ${year}`;

		if (!acc[year]) acc[year] = {};
		if (!acc[year][yearMonth]) acc[year][yearMonth] = [];
		acc[year][yearMonth].push(item);

		return acc;
	}, {});

	const sortedYears = Object.keys(groups)
		.sort((a, b) => b - a)
		.reduce((sortedAcc, year) => {
			sortedAcc[year] = groups[year];
			const sortedMonths = Object.keys(groups[year])
				.sort((a, b) => {
					const aDate = new Date(a);
					const bDate = new Date(b);
					return bDate - aDate;
				})
				.reduce((monthAcc, month) => {
					const sortedItems = groups[year][month].sort((a, b) => {
						const dateA = new Date(a.date);
						const dateB = new Date(b.date);
						return dateB - dateA;
					});
					monthAcc[month] = sortedItems;
					return monthAcc;
				}, {});

			sortedAcc[year] = sortedMonths;
			return sortedAcc;
		}, {});

	return sortedYears;
};
