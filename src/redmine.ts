import { Groups } from './routes/groups.ts'
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
	get unstableNews() {
		throw new Error('not implemented')
	}
	get unstableIssueRelation() {
		throw new Error('not implemented')
	}
	get unstableVersions() {
		throw new Error('not implemented')
	}
	get unstableWikiPages() {
		throw new Error('not implemented')
	}
	get unstableQueries() {
		throw new Error('not implemented')
	}
	get unstableAttachments() {
		throw new Error('not implemented')
	}
	get unstableIssueStatuses() {
		throw new Error('not implemented')
	}
	get unstableTracker() {
		throw new Error('not implemented')
	}
	get unstableEnumerations() {
		throw new Error('not implemented')
	}
	get unstableIssueCategories() {
		throw new Error('not implemented')
	}
	get unstableRoles() {
		throw new Error('not implemented')
	}

	/**
	 * Perform actions on groups.
	 *
	 * @example
	 * ```ts
	 * await redmine.groups.create({ name: 'my-group' })
	 * const { groups } = await redmine.groups.list()
	 *
	 * const [ myGroup ] = groups.filter(({name}) => name === 'my-group')
	 * await redmine.groups.addUser(myGroup.id, { id: 5 }) //add user of id 5 to 'my-group"
	 * ```
	 */
	get unstableGroups() {
		return new Groups(this.#endpoint, this.#apiKey)
	}
	get unstableCustomFields() {
		throw new Error('not implemented')
	}
	get unstableSearch() {
		throw new Error('not implemented')
	}
	get unstableFiles() {
		throw new Error('not implemented')
	}
	get unstableMyAccount() {
		throw new Error('not implemented')
	}
	get unstableJournals() {
		throw new Error('not implemented')
	}
}
