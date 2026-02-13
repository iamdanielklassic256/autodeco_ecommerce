import { config } from "./config";

export interface Subscriber {
	id: string;
	email: string;
	createdAt: string;
	updatedAt: string;
}

export interface CreateSubscriberDto {
	email: string;
}

const getBaseUrl = () => `${config.API.BASE_URL}/subscribers`;

const getHeaders = () => {
	const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
	const headers: Record<string, string> = {
		'Authorization': token ? `Bearer ${token}` : '',
		'Content-Type': 'application/json',
	};
	return headers;
};

export const createSubscriber = async (data: CreateSubscriberDto): Promise<Subscriber> => {
	const response = await fetch(`${getBaseUrl()}`, {
		method: "POST",
		headers: getHeaders(),
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || "Failed to create subscriber");
	}

	return response.json();
};


