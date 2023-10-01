import React from "react";

export const generateYearOptions = () => {
	const currentYear = new Date().getFullYear()
	const yearOptions = []

	for (let i = 0, year = currentYear; i < 5; i++) {
		yearOptions.push({ label: year.toString(), value: year.toString() })
		year--
	}

	return yearOptions
}

export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

