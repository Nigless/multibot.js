import Message from '../message';
import ICommand from './icommand';

export default class Greeting implements ICommand {
	public key = 'hello';

	public run(input: string[]): Message {
		const message = 'Hi!';

		return new Message(message);
	}
}
