import { Users } from './routes/users/mod.ts'

export interface Redmine {
	Config: {
		endpoint: string
		apiKey: string
	}
}

/**
 * Helper to communicate with Redmine REST API.
 *
 * @example
 * ```ts
 * const apiKey = Deno.env.get('REDMINE_API_KEY')
 * const endpoint = Deno.env.get('REDMINE_API_ENDPOINT')
 *
 * const redmine = new Redmine({ apikey, endpoint })
 *
 * const userList = await redmine.users.list({ limit: 20, offset: 5 })
 * const { id } = userList.filter(
 *  ({ mail }) => mail === 'old.mail@example.com'
 * )
 * await redmine.users.update(id, { mail: 'new.mail@example.com' })
 * ```
 */
export class Redmine {
	#apiKey: string
	#endpoint: string

	constructor({ apiKey, endpoint }: Redmine['Config']) {
		this.#apiKey = apiKey
		this.#endpoint = endpoint
	}

	get issues() {
		throw new Error('not implemented')
	}
	get projects() {
		throw new Error('not implemented')
	}
	get unstableProjectMemberships() {
		throw new Error('not implemented')
	}

	/**
	 * Perform actions on users.
	 *
	 * @example
	 * ```ts
	 * const userList = await redmine.users.list({ limit: 20, offset: 5 })
	 * const { id } = userList.filter(
	 *  ({ mail }) => mail === 'old.mail@example.com'
	 * )
	 * await redmine.users.update(id, { mail: 'new.mail@example.com' })
	 * ```
	 */
	get users() {
		return new Users(this.#endpoint, this.#apiKey)
	}
	get timeEntries() {
		throw new Error('not implemented')
	}
	get news() {
		throw new Error('not implemented')
	}
	get issueRelation() {
		throw new Error('not implemented')
	}
	get versions() {
		throw new Error('not implemented')
	}
	get wikiPages() {
		throw new Error('not implemented')
	}
	get queries() {
		throw new Error('not implemented')
	}
	get attachments() {
		throw new Error('not implemented')
	}
	get issueStatuses() {
		throw new Error('not implemented')
	}
	get tracker() {
		throw new Error('not implemented')
	}
	get enumerations() {
		throw new Error('not implemented')
	}
	get issueCategories() {
		throw new Error('not implemented')
	}
	get roles() {
		throw new Error('not implemented')
	}
	get groups() {
		throw new Error('not implemented')
	}
	get customFields() {
		throw new Error('not implemented')
	}
	get search() {
		throw new Error('not implemented')
	}
	get files() {
		throw new Error('not implemented')
	}
	get myAccount() {
		throw new Error('not implemented')
	}
	get journals() {
		throw new Error('not implemented')
	}
}
