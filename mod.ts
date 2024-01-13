/**
 * # Bluemine
 * A light zero dependencies Redmine REST API helper.
 *
 * ## Usage
 *
 * All modules are exposed in `mod.ts`
 *
 * ```ts
 * const apiKey = Deno.env.get('REDMINE_API_KEY')
 * const endpoint = Deno.env.get('REDMINE_API_ENDPOINT')
 *
 * const redmine = new Redmine({ apikey, endpoint })
 *
 * const userList = await redmine.users.list({ limit: 20, offset: 5 })
 * const { id } = userList.filter(
 * 	({ mail }) => mail === 'old.mail@service.com',
 * )
 * await redmine.users.update(id, { mail: 'new.mail@service.com' })
 * ```
 *
 * ### Users
 *
 * ```ts
 * const userList = await redmine.users.list({ limit: 20, offset: 5 })
 * const { id } = userList.filter(
 * 	({ mail }) => mail === 'old.mail@service.com',
 * )
 * await redmine.users.update(id, { mail: 'new.mail@service.com' })
 * ```
 *
 * ### Groups
 *
 * ```ts
 * await redmine.groups.create({ name: 'my-group' })
 * const { groups } = await redmine.groups.list()
 * const [myGroup] = groups.filter(({ name }) => name === 'my-group')
 * await redmine.groups.addUser(myGroup.id, { id: 5 }) //add user of id 5 to 'my-group"
 * ```
 *
 * [Documentation](https://deno.land/x/bluemine/mod.ts)
 *
 * @module
 * @license MIT
 */
export { Redmine } from './src/redmine.ts'
export { type Users } from './src/routes/users/mod.ts'
