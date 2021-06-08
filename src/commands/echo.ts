import Message from '../message';
import ICommand from './icommand';

export default class Echo implements ICommand {
	public key = 'echo';

	public run(input: string[]): Message {
		return new Message(input.join(' '));
	}
}
