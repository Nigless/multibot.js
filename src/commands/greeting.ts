import Config from '../config';
import Message from '../message';
import ICommand from './icommand';

interface IConfig {
	key: string;
}

export default class Greeting implements ICommand {
	public key: string;
	private config: IConfig;
	private messages: { greet: string | string[] };

	constructor(config: Config, messages: Config) {
		this.config = config.create<IConfig>('hello', { key: 'hello' });
		this.key = this.config.key;

		this.messages = messages.create<{ greet: string | string[] }>('hello', {
			greet: 'Hi!',
		});
	}

	public run(): Message {
		const greet = this.messages.greet;
		if (Array.isArray(greet)) {
			return new Message(greet[Math.floor(Math.random() * greet.length)]);
		}
		return new Message(greet);
	}
}
