import { Rest } from '../../utils.ts'

export class Groups {
	#endpoint: string
	#apiKey: string

	constructor(endpoint: string, apiKey: string) {
		this.#endpoint = endpoint
		this.#apiKey = apiKey
	}

	/**
	 * List all the groups alphabetically ordered by name.
	 *
	 * @returns Groups[]
	 *
	 * @example
	 * ```ts
	 * const groupList = await redmine.groups.list()
	 * console.log(groupList.groups)
	 * ```
	 *
	 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Groups#GET
	 */
	list() {
		return Rest.get<{ id: number; name: string }>(
			`${this.#endpoint}/groups.json`,
			this.#apiKey,
		)
	}

	/**
	 * Create a new group.
	 *
	 * @param { string } name - The name of the group to be created.
	 * @param { number[] } userIds - Id of users to includes.
	 *
	 * @example
	 * ```ts
	 * await redmine.groups.create({ name: 'my-group', userIds: [1, 2, 3] })
	 * ```
	 *
	 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Groups#POST
	 */
	create({ name, userIds }: Groups['Create']['Options']) {
		const payload = {
			group: {
				name,
				user_ids: userIds,
			},
		}

		return Rest.post(`${this.#endpoint}/groups.json`, this.#apiKey, payload)
	}

	/**
	 * Get a specific group.
	 *
	 * @param { number } id - Id of the group to retrieve.
	 * @param  options - Additional infos to includes.
	 * @returns Group.
	 *
	 * @example
	 * ```ts
	 * const group = await redmine.groups.get(5)
	 * console.log(group.name)
	 * ```
	 *
	 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Groups#GET-2
	 */
	get(id: number, { users, memberships }: Groups['Get']['Options']) {
		const query = new URLSearchParams()
		if (users && memberships) query.append('include', 'users,memberships')
		else if (users) query.append('include', 'users')
		else if (memberships) query.append('include', 'memberships')

		const requestURL = `${this.#endpoint}/groups/${id}.json?${query.toString()}`

		return Rest.get<Groups['Get']['Result']>(requestURL, this.#apiKey)
	}

	/**
	 * Add a user to an existing group.
	 *
	 * @param {number} id - Id of the group to which the user will be added.
	 * @param  user - Id of the user to add.
	 *
	 * @example
	 * ```ts
	 * const [ bob ] = await redmine.users.list({ limit: 1, name: 'bob' })
	 * await redmine.groups.addUser(5, bob) //bob is added to group 5
	 * ```
	 *
	 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Groups#POST-2
	 */
	addUser(id: number, { id: user_id }: { id: number }) {
		const payload = { user_id }
		const requestURL = `${this.#endpoint}/groups/${id}/users.json}`
		return Rest.post(requestURL, this.#apiKey, payload)
	}

	/**
	 * Remove a user from an existing group.
	 *
	 * @param {number} id - Id of the group from which the user will be removed.
	 * @param  user - Id of the user to remove.
	 *
	 * @example
	 * ```ts
	 * const [ bob ] = await redmine.users.list({ limit: 1, name: 'bob' })
	 * await redmine.groups.removeUser(5, bob) //bob is removed from group 5
	 * ```
	 *
	 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Groups#DELETE-2
	 */
	removeUser(id: number, { id: userId }: { id: number }) {
		const requestURL = `${this.#endpoint}/groups/${id}/users/${userId}.json}`
		return Rest.delete(requestURL, this.#apiKey)
	}
}

export interface Groups {
	Create: {
		Options: {
			name: string
			userIds: number[]
		}
	}

	Get: {
		Options: {
			users: boolean
			memberships: boolean
		}
		Result: {
			group: {
				id: number
				name: string
				users: {
					id: number
					name: string
				}[]
			}
		}
	}
}
