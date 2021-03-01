import eris from 'eris';
import Config, { Section } from '../config';
import Parser from '../parser';

interface LocalConfig extends Section {
	token: string;
}

export default class Discord {
	private config: LocalConfig;

	constructor(parser: Parser, config: Config) {
		this.config = config.section<LocalConfig>('api.discord', {
			token: '',
		});
		if (this.config.token === '') return;

		const bot = eris(this.config.token);
		bot.on('messageCreate', (input) => {
			const message = parser.run(input.content);
			if (message !== undefined && message.text !== undefined)
				bot.createMessage(input.channel.id, message.text);
		});
		bot.connect();
	}
}
