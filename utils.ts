import { JsonValue } from './deps.ts'

export class Rest {
	static async #jsonOrThrow(response: Response) {
		if (response.ok) return response.json()
		const body = await response.text()
		const cause = new Error(body)
		throw new TypeError(
			`invalid json, bad response from "${response.url}" [${response.status}]: ${response.statusText}`,
			{ cause },
		)
	}

	static async post<T extends JsonValue, R extends JsonValue>(
		endpoint: string,
		apiKey: string,
		payload: T,
	): Promise<R> {
		const response = await fetch(endpoint, {
			body: JSON.stringify(payload),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Redmine-API-Key': apiKey,
			},
		})
		return this.#jsonOrThrow(response)
	}

	static async get<T extends JsonValue>(
		endpoint: string,
		apiKey: string,
	): Promise<T> {
		const response = await fetch(endpoint, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-Redmine-API-Key': apiKey,
			},
		})
		return this.#jsonOrThrow(response)
	}

	static async put<T extends JsonValue, R extends JsonValue>(
		endpoint: string,
		apiKey: string,
		payload: T,
	): Promise<R> {
		const response = await fetch(endpoint, {
			method: 'PUT',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json',
				'X-Redmine-API-Key': apiKey,
			},
		})
		return this.#jsonOrThrow(response)
	}

	static async delete<T extends JsonValue>(
		endpoint: string,
		apiKey: string,
	): Promise<T> {
		const response = await fetch(endpoint, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'X-Redmine-API-Key': apiKey,
			},
		})
		return this.#jsonOrThrow(response)
	}
}
