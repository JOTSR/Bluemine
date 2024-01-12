import { Rest } from '../../../../utils.ts'
import { GetResult } from './get.ts'

export function list(endpoint: string, apiKey: string) {
	return ({ limit, offset }: Partial<ListOptions>) => {
		const payload = new URLSearchParams()
		if (limit) payload.append('limit', limit.toString())
		if (offset) payload.append('offset', offset.toString())

		const { href } = new URL(`users.json?${payload.toString()}`, endpoint)

		return Rest.get<GetResult>(href, apiKey)
	}
}

export type ListOptions = {
	limit: number
	offset: number
}

export type ListResult = {
	limit: number
	offset: number
	total_count: number
	users: Omit<GetResult, 'api_key' | 'status'>[]
}
