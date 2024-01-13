import { Rest } from '../../../../utils.ts'
import { User } from './create.ts'

export function update(endpoint: string, apiKey: string) {
	return (id: number, options: UpdateOptions) => {
		const requestURL = `${endpoint}/users/${id}.json`

		return Rest.put(requestURL, apiKey, JSON.stringify(options))
	}
}

export type UpdateOptions = {
	user: User
	admin?: boolean
	custom_fields?: Record<string, string | number>
}
