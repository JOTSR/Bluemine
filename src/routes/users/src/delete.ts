import { Rest } from '../../../../utils.ts'

export function erase(endpoint: string, apiKey: string) {
	return (id: string) => {
		const requestURL = `${endpoint}/users/${id}.json`

		return Rest.delete(requestURL, apiKey)
	}
}
