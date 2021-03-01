import readline from 'readline';
import Parser from '../parser';

export default class Cli {
	constructor(parser: Parser) {
		readline
			.createInterface({
				input: process.stdin,
				output: process.stdout,
			})
			.addListener('line', (input) =>
				console.log(parser.run(input, false)!.text),
			);
	}
}
