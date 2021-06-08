import Message from '../message';
import ICommand from './icommand';

export class CommandRouter {
	private commands: ICommand[];

	constructor(...commands: ICommand[]) {
		this.commands = commands;
	}

	public run(input: string[]): Message {
		const command = this.commands.find((command) => command.key === input[0]);
		if (command) return command.run(input.slice(1));
		return new Message('');
	}
}
