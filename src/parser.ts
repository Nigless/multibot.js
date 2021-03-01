import parser, { Arguments } from 'yargs-parser';
import { IOption } from './commands/icommand';
import Root from './commands/root';
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
	private rootCommand: Root;

	constructor() {
		this.rootCommand = new Root(this);
	}

	public run(input: string, withPrefix = true): Message | undefined {
		if (withPrefix) {
			const temporary = input.replace(/^\\\\\s/, '');
			if (temporary[0] === input[0]) return;
			input = temporary;
		}

		return this.rootCommand.run(
			this.parse(input, this.rootCommand.options) as any,
		);
	}

	public parse(input: string | string[], options: IOption[]): Arguments {
		let config: parser.Options;
		{
			const temporary: any = {};
			const push = (key: string, value: string) => {
				if (temporary[key] === undefined) temporary[key] = [];
				temporary[key].push(value);
			};
			for (const option of options) {
				push(option.type, option.alias);
				if (temporary['alias'] === undefined) temporary['alias'] = {};
				temporary['alias'][option.alias] = option.name;
			}
			temporary['configuration'] = { 'halt-at-non-option': true };
			config = temporary;
		}
		return parser(input, config);
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
		return string.replace('\\{', '{').replace('\\}', '}');
	}
}
