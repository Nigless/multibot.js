import readline from 'readline';
import Parser from '../parser';

export default class Cli {
	constructor(parser: Parser) {
		readline
			.createInterface({
				input: process.stdin,
				output: process.stdout,
			})
			.addListener('line', (input) => {
				const message = parser.run(input, false);
				if (message !== undefined && message.text) console.log(message.text);
			});
	}
}
