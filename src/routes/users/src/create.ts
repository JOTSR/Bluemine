import { Rest } from '../../../../utils.ts'
import { type GetResult } from './get.ts'

export function create(endpoint: string, apiKey: string) {
	const requestURL = `${endpoint}/users.json`

	return (
		{
			login,
			lastname,
			firstname,
			mail,
			sendCreationMail,
			mailNotification,
			customFields,
			authSourceId,
			...options
		}: Config,
	) => {
		const payload = {
			user: {
				login,
				lastname,
				firstname,
				mail,
				password: ('password') in options ? options.password : undefined,
				auth_source_id: authSourceId,
				mail_notification: mailNotification,
				must_change_passwd: options.mustChangePassword,
				generate_password: !('password' in options)
					? options.generatePassword
					: false,
				custom_fields: customFields,
			},
			send_information: sendCreationMail,
		}

		return Rest.post(requestURL, apiKey, payload) as unknown as Promise<
			{ user: GetResult }
		>
	}
}

export type Config =
	& User
	& Partial<ConfigOptions>
	& (ConfigPassAuto | ConfigPassDefined)

type ConfigOptions = {
	mailNotification: string
	customFields: string[]
	sendCreationMail: boolean
	authSourceId: string
	mustChangePassword: boolean
}

type ConfigPassDefined = {
	mustChangePassword: true
	password: string
}

type ConfigPassAuto = {
	generatePassword: true
	sendCreationMail: true
}

//TODO refactor to specific class
export type User = {
	login: string
	firstname: string
	lastname: string
	mail: string
}
