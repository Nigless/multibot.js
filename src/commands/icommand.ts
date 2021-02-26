import IMessage from '../message';

export default interface ICommand<Options = void> {
	key: string;
	options: { [key: string]: string };

	run(options: Options): IMessage;
}
