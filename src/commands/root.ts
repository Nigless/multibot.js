import Message from '../message';
import { CommandRouter } from './command-router';
import Echo from './echo';
import Greeting from './greeting';

export default class Root {
	private router: CommandRouter = new CommandRouter(new Greeting(), new Echo());

	public run(input: string[]): Message {
		return this.router.run(input);
	}
}
