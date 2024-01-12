import { Config, create, User } from './src/create.ts'
import { erase } from './src/delete.ts'
import { get, GetOptions, GetResult } from './src/get.ts'
import { list, ListOptions, ListResult } from './src/list.ts'
import { update, UpdateOptions } from './src/update.ts'

export interface Users {
	User: User
	Create: {
		Config: Config
	}
	Get: {
		Options: GetOptions
		Result: GetResult
	}
	List: {
		Options: ListOptions
		Result: ListResult
	}
	Update: {
		Options: UpdateOptions
	}
}

export class Users {
	#endpoint: string
	#apiKey: string

	constructor(endpoint: string, apiKey: string) {
		this.#endpoint = endpoint
		this.#apiKey = apiKey
	}

	get list() {
		return list(this.#endpoint, this.#apiKey)
	}
	get create() {
		return create(this.#endpoint, this.#apiKey)
	}
	get get() {
		return get(this.#endpoint, this.#apiKey)
	}
	get update() {
		return update(this.#endpoint, this.#apiKey)
	}
	get erase() {
		return erase(this.#endpoint, this.#apiKey)
	}
}
