import { Rest } from '../../../../utils.ts'
import { GetResult } from './get.ts'

export function list(endpoint: string, apiKey: string) {
	return ({ limit, offset, status, name, groupId }: Partial<ListOptions>) => {
		const payload = new URLSearchParams()
		if (limit) payload.append('limit', limit.toString())
		if (offset) payload.append('offset', offset.toString())
		if (status) {
			payload.append(
				'status',
				status === 'active' ? '1' : status === 'registered' ? '2' : '3',
			)
		}
		if (name) payload.append('name', name.toString())
		if (groupId) payload.append('group_id', groupId.toString())

		const requestURL = `${endpoint}/users.json?${payload.toString()}`

		return Rest.get<ListResult>(requestURL, apiKey)
	}
}

export type ListOptions = {
	limit: number
	offset: number
	status: 'active' | 'registered' | 'locked'
	name: string
	groupId: number
}

export type ListResult = {
	limit: number
	offset: number
	total_count: number
	users: Omit<GetResult, 'api_key' | 'status'>[]
}
