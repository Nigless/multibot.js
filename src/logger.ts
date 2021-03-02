enum Log {
	WARN,
	ERROR,
	DEBUG,
	FATAL,
}

export default class Logger<Type extends Record<string, string>> {
	private template: string;

	constructor(template: string) {
		this.template = template;
	}

	public info(data: Type): void {
		console.info(this.format(data, Log.WARN));
	}

	public warn(data: Type): void {
		console.warn(this.format(data, Log.WARN));
	}

	public error(data: Type): void {
		console.error(this.format(data, Log.ERROR));
	}

	public debug(data: Type): void {
		console.debug(this.format(data, Log.DEBUG));
	}

	public fatal(data: Type): void {
		console.error(this.format(data, Log.FATAL));
	}

	private format(searchValues: Type, type: Log): string {
		let template = this.template;

		for (const key of Object.keys(searchValues))
			template = template.replace(
				new RegExp(`(?<!\\\\){${key}}`, 'g'),
				searchValues[key],
			);
		template = template
			.replace(/{([^\\}]|\\.)*}|\\([{}])/g, '$2')
			.replace(/ {2,}/, ' ');

		return (
			new Date().toLocaleString('en-US', {
				hour12: false,
				month: 'short',
				day: 'numeric',
				hour: 'numeric',
				minute: '2-digit',
				second: '2-digit',
			}) +
			'\t' +
			Log[type] +
			'\t' +
			template
		);
	}
}
