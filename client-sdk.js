/*
This file contains code for client side integration SDK
User needs to load this JS file in their project (Will serve it via some CDN)
and when this SDK is loaded, they can use the below syntax to capture event

const response = await window.sankhyaSDKv1.captureUserEvent("api-key-here");

This is all that customer has to do after setting up their project
*/

function captureSankhyaEvent(apiKey) {
	return new Promise(async (resolve, reject) => {
		try {
			if (typeof window === "undefined") {
				return reject("You can use Sankhya only on client side.");
			}

			if (checkIfEventAlreadyCaptured()) {
				return reject("You have already captured an event.");
			}

			const url = "https://sankhya.cyclic.app/api/v1/event";
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
	const userAgent = navigator.userAgent;
	const popularOSList = [
		{ name: "Android", value: "Android" },
		{ name: "iOS", value: "iPhone" },
		{ name: "MacOS", value: "Mac" },
		{ name: "Linux", value: "Linux" },
		{ name: "Windows", value: "Win" },
	];

	for (const os of popularOSList) {
		if (userAgent.includes(os.value)) {
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

window.sankhyaSDKv1 = {
	captureUserEvent: captureSankhyaEvent,
};
