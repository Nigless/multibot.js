import Config from '../config';
import Message from '../message';
import ICommand from './icommand';

interface IConfig {
	key: string;
}

interface IMesages {
	message: string;
	options: {
		uppercase: string;
	};
}

export default class Greeting implements ICommand {
	public key: string;
	public options: {
		'-u --uppercase': string;
	};
	private config: IConfig;
	private messages: IMesages;

	constructor(config: Config, messages: Config) {
		this.config = config.create<IConfig>('greeting', { key: 'hello' });
		this.key = this.config.key;

		this.messages = messages.create<IMesages>('greeting', {
			message: 'Hello!',
			options: {
				uppercase: 'HELLO!',
			},
		});

		this.options = { '-u --uppercase': this.messages.options.uppercase };
	}

	public run(): Message {
		return new Message(this.messages.message);
	}
}
