import { Config, create, User } from './src/create.ts'
import { erase } from './src/delete.ts'
import { get, GetOptions, GetResult } from './src/get.ts'
import { list, ListOptions, ListResult } from './src/list.ts'
import { update, UpdateOptions } from './src/update.ts'

export interface Users {
	User: User
	Create: {
		Config: Config
	}
	Get: {
		Options: GetOptions
		Result: GetResult
	}
	List: {
		Options: ListOptions
		Result: ListResult
	}
	Update: {
		Options: UpdateOptions
	}
}

export class Users {
	#endpoint: string
	#apiKey: string

	constructor(endpoint: string, apiKey: string) {
		this.#endpoint = endpoint
		this.#apiKey = apiKey
	}

	/**
	 * List all the users alphabetically sorted by login.
	 *
	 * @param { number } limit - Number of users to retrieve (max: 100).
	 * @param { number } offset - Frame query offset.
	 * @param { string } status - Filter users by status. (default: active)
	 * @param { string } name - Filter users by status.
	 * @param { number } groupId - Filter users by group_id.
	 * @returns Users[]
	 *
	 * @example
	 * ```ts
	 * const userList = await redmine.users.list({ limit: 20, offset: 5 })
	 * console.log(userList.users)
	 * ```
	 * 
	 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Users#GET
	 */
	get list() {
		return list(this.#endpoint, this.#apiKey)
	}

	/**
	 * Create a new user.
	 * 
	 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Users#POST
	 */
	get create() {
		return create(this.#endpoint, this.#apiKey)
	}

	/**
	 * Get a specific user.
	 *
	 * @param { number } id - User id.
	 * @param options - Get user memberships and/or groups.
	 * @returns User
	 *
	 * @example
	 * ```ts
	 * const user = await redmine.user.get(5)
	 * console.log(user.admin)
	 * console.log(user.mail)
	 * ```
	 * 
	 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Users#GET-2
	 */
	get get() {
		return get(this.#endpoint, this.#apiKey)
	}

	/**
	 * Update an existing user profile.
	 *
	 * @param { number } id - User id.
	 * @param options - Same as create user,
	 * all specified properties will be overwritten.
	 *
	 * @example
	 * ```ts
	 * await redmine.users.update(5, { mail: 'new.mail@example.com' })
	 * ```
	 * 
	 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Users#PUT
	 */
	get update() {
		return update(this.#endpoint, this.#apiKey)
	}

	/**
	 * Delete the specified user account.
	 * ⚠️ This action is irreversible ⚠️
	 *
	 * @param { number } id - User id.
	 * 
	 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Users#DELETE
	 */
	get erase() {
		return erase(this.#endpoint, this.#apiKey)
	}
}
