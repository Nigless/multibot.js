import parser from 'yargs-parser';
import Greeting from './commands/greeting';
import ICommand, { Type } from './commands/icommand';
import Config from './config';
import Message from './message';

interface MainConfigType {
	[key: string]: string | number;
}
interface MessagesConfigType {
	[key: string]: string;
}
export type MainConfig = Config<MainConfigType>;
export type MessagesConfig = Config<MessagesConfigType>;

export default class Parser {
	private commands: ICommand[];
	constructor() {
		const config = new Config<MainConfigType>('config');
		const messages = new Config<MessagesConfigType>('messages');
		this.commands = [new Greeting(config, messages)];
	}

	public run(string: string): Message {
		const commandOptions: Record<string, unknown> = {};
		let command;

		{
			const options = parser(string.split(' '));
			if (options._[0] === '') return new Message('?');

			command = this.commands.find((element) => element.key === options._[0]);
			if (command === undefined)
				return new Message(
					this.replace('Неизвестная комманда: {COMMAND}', {
						COMMAND: options._[0],
					}),
				);

			const keys = Object.keys(options);

			for (let index = 1; index < keys.length; index++) {
				const key = keys[index];

				const option =
					key.length === 1
						? command.options.find((option) => option.alias === key)
						: command.options.find((option) => option.name === key);

				if (option === undefined)
					return new Message(
						this.replace('Неизвестный параметр: {OPTION}', { OPTION: key }),
					);
				const value = options[key];
				if (Type[option.type] !== typeof value)
					return new Message(
						this.replace(
							'Значение "{VALUE}" не соответствует типу <{TYPE}> параметра "{OPTION}"',
							{
								VALUE: value,
								TYPE: Type[option.type],
								OPTION: option.name,
							},
						),
					);
				commandOptions[option.name] = value;
			}
			commandOptions['_'] = options._.slice(1);
		}

		return command.run(commandOptions);
	}

	private replace(
		string: string,
		searchValues: { [key: string]: string },
	): string {
		for (const key in searchValues) {
			string = string.replace(
				new RegExp(`(?<!\\\\)\\{${key}\\}`),
				searchValues[key],
			);
		}
		return string.replace('\\{', '{');
	}
}
