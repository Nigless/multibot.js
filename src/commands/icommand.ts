import Message from '../message';

export interface Option {
	key: string;
	type: 'boolean' | 'string' | 'number';
	alias?: string;
	description?: string;
}

export default interface ICommand {
	key: string;
	description?: string;
	run: (input: string[]) => Message;
}
