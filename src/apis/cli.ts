import readline from 'readline';
import Parser from '../parser';
export default class Cli {
	constructor() {
		readline
			.createInterface({
				input: process.stdin,
				output: process.stdout,
			})
			.addListener('line', this.lineHandler);
	}
	private lineHandler(input: string) {
		const parser = new Parser();
		console.log(parser.run(input).text);
	}
}
