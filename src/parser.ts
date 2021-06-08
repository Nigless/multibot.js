import Root from './commands/root';
import Message from './message';

export default class Parser {
	private rootCommand: Root;

	constructor() {
		this.rootCommand = new Root();
	}

	public run(input: string, withPrefix = true): Message | undefined {
		if (withPrefix) {
			const temporary = input.replace(/^\\\s/, '');
			if (temporary[0] === input[0] || !temporary) return;
			input = temporary;
		}

		return this.rootCommand.run(input.split(/\s+/));
	}
}
