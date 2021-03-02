import parser, { Arguments } from 'yargs-parser';
import { IOption } from './commands/icommand';
import Root from './commands/root';
import Message from './message';

export default class Parser {
	private rootCommand: Root;

	constructor() {
		this.rootCommand = new Root(this);
	}

	public run(input: string, withPrefix = true): Message | undefined {
		if (withPrefix) {
			const temporary = input.replace(/^\\\s/, '');
			if (temporary[0] === input[0] || !temporary) return;
			input = temporary;
		}

		const options = this.parseInput(input);
		if (!options) return;
		return this.rootCommand.run(
			this.parseOptions(options, this.rootCommand.options) as any,
		);
	}

	public parseInput(input: string): string[] | undefined {
		const matches = input.match(/("(\\.|[^"])*"|\\.|\S)+/g);
		if (matches) return matches.map((math) => math.replace(/\\(.)/g, '$1'));
		return;
	}

	public parseOptions(input: string[], options: IOption[]): Arguments {
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
}
