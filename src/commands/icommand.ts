import { Arguments as IArguments } from 'yargs-parser';
import Message from '../message';
import Parser from '../parser';

export { IArguments };

export interface IOption {
	name: string;
	type: 'boolean' | 'string' | 'number';
	alias: string;
	description?: string;
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
				this.parser.parseOptions(input.slice(1), subCommand.options),
			);
		return new Message('');
	}
}

export default interface ICommand {
	key: string;
	options: IOption[];
	description?: string;
	run: (options: IArguments) => Message;
}
