import { create } from './src/create.ts'
import { erase } from './src/delete.ts'
import { get } from './src/get.ts'
import { list } from './src/list.ts'
import { update } from './src/update.ts'

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
