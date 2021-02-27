import Message from '../message';
import { MainConfig, MessagesConfig } from '../parser';
import ICommand, { Type } from './icommand';

interface IOptions {
	uppercase: boolean;
}

export default class Greeting implements ICommand {
	public key: string;
	public options = [
		{
			name: 'uppercase',
			type: Type.boolean,
			alias: 'u',
		},
	];
	private config;
	private messages;

	constructor(config: MainConfig, messages: MessagesConfig) {
		this.config = config.create('greeting', { key: 'hello' });
		this.key = this.config.key as string;

		this.messages = messages.create('greeting', {
			message: 'Hello!',
			'options.uppercase': 'HELLO!',
		});
	}

	public run(options: IOptions): Message {
		if (options.uppercase)
			return new Message(this.messages.message.toUpperCase());
		return new Message(this.messages.message);
	}
}
