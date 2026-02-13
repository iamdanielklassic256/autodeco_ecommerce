import { SparePart } from "@/types/spare-parts";
import { config } from "./config";


export interface SparePartFilters {
	page?: number;
	limit?: number;
	search?: string;
	category?: string;
}

export interface SparePartMeta {
	total: number;
	page: number;
	last_page: number;
}

export interface PaginatedSpareParts {
	data: SparePart[];
	meta: SparePartMeta;
}

const getBaseUrl = () => `${config.API.BASE_URL || "http://localhost:4002/api/v1"}/spare-parts`;

const getHeaders = (isFormData: boolean = false) => {
	const token = localStorage.getItem('token');
	const headers: Record<string, string> = {
		'Authorization': token ? `Bearer ${token}` : '',
	};

	if (!isFormData) {
		headers['Content-Type'] = 'application/json';
	}

	return headers;
};

export const getSpareParts = async (filters: SparePartFilters = {}): Promise<PaginatedSpareParts> => {
	const queryParams = new URLSearchParams();
	Object.entries(filters).forEach(([key, value]) => {
		if (value !== undefined) {
			queryParams.append(key, value.toString());
		}
	});

	const response = await fetch(`${getBaseUrl()}?${queryParams.toString()}`, {
		method: "GET",
		headers: getHeaders(),
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || "Failed to fetch spare parts");
	}

	return response.json();
};

export const getSparePartById = async (id: string): Promise<SparePart> => {
	const response = await fetch(`${getBaseUrl()}/${id}`, {
		method: "GET",
		headers: getHeaders(),
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || "Failed to fetch spare part");
	}

	return response.json();
};


