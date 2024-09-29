function captureSankhyaEvent(apiKey) {
	return new Promise(async (resolve, reject) => {
		try {
			if (typeof window === "undefined") {
				return reject("You can use Sankhya only on client side.");
			}

			console.log({ apiKey });

			if (!apiKey || !apiKey?.length) {
				return reject("API key missing.");
			}

			if (checkIfEventAlreadyCaptured()) {
				return reject("You have already captured an event.");
			}

			const url = "https://sankhya-9kzfvqga.b4a.run/api/v1/event";
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": apiKey,
				},
				body: JSON.stringify({
					screenResolution: `${screen.width}x${screen.height}`,
					operatingSystem: getClientOperatingSystem(),
				}),
			};
			const response = await fetch(url, options);
			const data = await response.json();

			if (data.success) {
				updateEventCaptureStatus();
				resolve(data);
			} else {
				reject(
					data.message ??
						"Failed to capture event. Please try again later."
				);
			}
		} catch (error) {
			reject(
				error.message ??
					"Failed to capture event. Please try again later."
			);
		}
	});
}

function getClientOperatingSystem() {
	const platformName = navigator.platform ?? navigator.userAgent;
	const popularOSList = [
		{ name: "Android", value: "Android" },
		{ name: "iOS", value: "iPhone" },
		{ name: "MacOS", value: "Mac" },
		{ name: "Linux", value: "Linux" },
		{ name: "Windows", value: "Win" },
	];

	for (const os of popularOSList) {
		if (platformName.includes(os.value)) {
			return os.name;
		}
	}
	return "Unknown";
}

function checkIfEventAlreadyCaptured() {
	const captureStatus = sessionStorage.getItem("sankhya-event-status");
	return captureStatus && captureStatus === "captured";
}

function updateEventCaptureStatus() {
	sessionStorage.setItem("sankhya-event-status", "captured");
}

function getApiKeyFromQueryParam() {
	const scriptSrc = document.currentScript.src;
	const keyFromUrl = new URL(scriptSrc).searchParams.get("key");
	return keyFromUrl;
}

(async () => {
	try {
		await captureSankhyaEvent(getApiKeyFromQueryParam());
	} catch (_) {}
})();
