import Message from '../message';
import Parser from '../parser';
import Greeting from './greeting';
import { IArguments, IOption, WithSubCommand } from './icommand';

interface Arguments extends IArguments {
	version?: boolean;
}

export default class Root extends WithSubCommand {
	public options: IOption[] = [
		{
			name: 'version',
			type: 'boolean',
			alias: 'v',
		},
	];

	constructor(parser: Parser) {
		super(parser, [new Greeting()]);
	}

	public run(options: Arguments): Message {
		return this.runSubCommand(options._);
	}
}
