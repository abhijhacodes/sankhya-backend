const validateEmail = (email: string) => {
	if (!email) return false;

	const emailRegex = /\S+@\S+\.\S+/;
	return emailRegex.test(email);
};

export const validators = {
	validateEmail,
};
