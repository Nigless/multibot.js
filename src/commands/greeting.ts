import Message from '../message';
import ICommand, { IArguments, IOption } from './icommand';

interface Arguments extends IArguments {
	uppercase?: boolean;
}

export default class Greeting implements ICommand {
	public key = 'hello';
	public options: IOption[] = [
		{
			name: 'uppercase',
			type: 'boolean',
			alias: 'u',
		},
	];

	public run(options: Arguments): Message {
		let message = 'Hi!';
		if (options.uppercase) {
			message = message.toUpperCase();
		}
		return new Message(message);
	}
}
