import { create } from './src/create.ts'
import { erase } from './src/delete.ts'
import { get } from './src/get.ts'
import { list } from './src/list.ts'
import { update } from './src/update.ts'

export function userRoute(endpoint: string, apiKey: string) {
	return {
		list: list(endpoint, apiKey),
		create: create(endpoint, apiKey),
		get: get(endpoint, apiKey),
		update: update(endpoint, apiKey),
		erase: erase(endpoint, apiKey),
	}
}
