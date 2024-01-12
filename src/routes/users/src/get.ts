import { ISOString } from '../../../../types.ts'
import { Rest } from '../../../../utils.ts'

export function get(endpoint: string, apiKey: string) {
	return (id: number, { memberships, groups }: Partial<GetOptions>) => {
		const params = new URLSearchParams()

		if (memberships && groups) params.append('include', 'memberships,groups')
		else if (memberships) params.append('include', 'memberships')
		else if (groups) params.append('include', 'groups')

		const { href } = new URL(`users/${id}.json?${params.toString()}`, endpoint)

		return Rest.get<GetResult>(href, apiKey)
	}
}

export type GetOptions = {
	memberships: boolean
	groups: boolean
}

export type GetResult = {
	id: number
	login: string
	firstname: string
	lastname: string
	mail: string
	created_on: ISOString
	updated_on: ISOString
	last_login_on: ISOString | null
	passwd_changed_on: ISOString
	api_key: string | null
	status: number
	admin: boolean
	twofa_scheme: null
	custom_fields: Record<string, string | number>[]
}
