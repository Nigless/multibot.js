import Message from '../message';
import ICommand, { IArguments, IOption } from './icommand';

interface Arguments extends IArguments {
	message?: string;
}

export default class Echo implements ICommand {
	public key = 'echo';
	public options: IOption[] = [
		{
			name: 'message',
			type: 'string',
			alias: 'm',
		},
	];

	public run(options: Arguments): Message {
		return new Message(options.message);
	}
}
