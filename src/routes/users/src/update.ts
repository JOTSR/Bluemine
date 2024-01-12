import { Rest } from '../../../../utils.ts'
import { User } from './create.ts'

export function update(endpoint: string, apiKey: string) {
	return (id: string, options: UpdateOptions) => {
		const { href } = new URL(`users/${id}.json`, endpoint)

		return Rest.put(href, apiKey, JSON.stringify(options))
	}
}

export type UpdateOptions = {
	user: User
	admin?: boolean
	custom_fields?: Record<string, string | number>
}
