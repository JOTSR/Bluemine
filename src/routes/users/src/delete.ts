import { Rest } from '../../../../utils.ts'

export function erase(endpoint: string, apiKey: string) {
	return (id: string) => {
		const { href } = new URL(`users/${id}.json`, endpoint)

		return Rest.delete(href, apiKey)
	}
}
