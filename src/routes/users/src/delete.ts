import { Rest } from '../../../../utils.ts'

export function erase(endpoint: string, apiKey: string) {
	return (id: number) => {
		const requestURL = `${endpoint}/users/${id}.json`

		return Rest.delete(requestURL, apiKey)
	}
}
