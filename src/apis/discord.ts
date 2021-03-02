import eris from 'eris';
import Config, { Section } from '../config';
import Logger from '../logger';
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

		const logger = new Logger<{
			COMMAND: string;
			REPLY: string;
			USERID: string;
		}>('discord: command="{COMMAND}" reply="{REPLY}" userid={USERID}');

		const bot = eris(this.config.token);

		bot.on('messageCreate', (input) => {
			const message = parser.run(input.content);
			if (message !== undefined && message.text) {
				bot.createMessage(input.channel.id, message.text);
				logger.info({
					COMMAND: input.content.replace(/"/g, '\\"').replace(/\n/g, '\\n'),
					REPLY: message.text.replace(/"/g, '\\"').replace(/\n/g, '\\n'),
					USERID: input.author.id,
				});
			}
		});
		bot.connect();
	}
}
