import Message from '../message';

export enum Type {
	string,
	boolean,
	number,
}

export type Option = {
	name: string;
	type: Type;
	alias: string;
};

export default interface ICommand {
	key: string;
	options: Option[];

	run(options: unknown): Message;
}
