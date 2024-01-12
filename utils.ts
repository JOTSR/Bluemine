import { JsonValue } from './deps.ts'

export class Rest {
	static #headers(apiKey: string) {
		return {
			'Content-Type': 'application/json',
			'X-Redmine-API-Key': apiKey,
		}
	}

	static async post<T extends JsonValue, R extends JsonValue>(
		endpoint: string,
		apiKey: string,
		payload: T,
	): Promise<R> {
		const response = await fetch(endpoint, {
			body: JSON.stringify(payload),
			method: 'POST',
			cache: 'no-cache',
			headers: this.#headers(apiKey),
		})
		return response.json()
	}

	static async get<T extends JsonValue>(
		endpoint: string,
		apiKey: string,
	): Promise<T> {
		const response = await fetch(endpoint, {
			method: 'GET',
			cache: 'no-cache',
			headers: this.#headers(apiKey),
		})
		return response.json()
	}

	static async put<T extends JsonValue, R extends JsonValue>(
		endpoint: string,
		apiKey: string,
		payload: T,
	): Promise<R> {
		const response = await fetch(endpoint, {
			method: 'PUT',
			body: JSON.stringify(payload),
			cache: 'no-cache',
			headers: this.#headers(apiKey),
		})
		return response.json()
	}

	static async delete<T extends JsonValue>(
		endpoint: string,
		apiKey: string,
	): Promise<T> {
		const response = await fetch(endpoint, {
			method: 'DELETE',
			cache: 'no-cache',
			headers: this.#headers(apiKey),
		})
		return response.json()
	}
}
