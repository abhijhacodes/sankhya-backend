import { checkIfUUIDIsValid } from "./helpers";

const validateEmail = (email?: string) => {
	if (!email) return false;

	const emailRegex = /\S+@\S+\.\S+/;
	return emailRegex.test(email);
};

const checkIfArrayOfUUIDs = (arr: string[]) => {
	if (Array.isArray(arr)) {
		return arr.every((id) => checkIfUUIDIsValid(id));
	}
	return false;
};

const checkIfValidDateTime = (date: string) => {
	const parsedDate = new Date(date);
	return (
		!isNaN(parsedDate.getTime()) && parsedDate.toString() !== "Invalid Date"
	);
};

export const validators = {
	validateEmail,
	checkIfArrayOfUUIDs,
	checkIfValidDateTime,
};
