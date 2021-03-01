import { Arguments as IArguments } from 'yargs-parser';
import Message from '../message';
import Parser from '../parser';

export interface IOption {
	name: string;
	type: 'boolean' | 'string' | 'number';
	alias: string;
}

export { IArguments };

export default interface ICommand {
	key: string;
	options: IOption[];
	run: (options: IArguments) => Message;
}

export class WithSubCommand {
	private parser: Parser;
	private subCommands: ICommand[];

	constructor(parser: Parser, subCommands: ICommand[]) {
		this.subCommands = subCommands;
		this.parser = parser;
	}

	protected runSubCommand(input: string[]): Message {
		const subCommand = this.subCommands.find(
			(command) => command.key === input[0],
		);
		if (subCommand !== undefined)
			return subCommand.run(
				this.parser.parse(input.slice(1), subCommand.options),
			);
		return new Message('');
	}
}
