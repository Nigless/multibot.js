import IMessage from '../message';

export default interface ICommand<Options = void> {
	key: string;

	run(options: Options): IMessage;
}
