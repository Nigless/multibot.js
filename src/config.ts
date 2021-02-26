import fs from 'fs';
import yaml from 'js-yaml';

type Data = { [key: string]: unknown };

export default class Config {
	private data: Data;
	private fileName: string;

	constructor(fileName: string) {
		this.fileName = `./${fileName}.yml`;
		this.data = {};
		this.load();
	}

	public create<Type>(id: string, defaultConfig: Type): Type {
		if (this.data[id] === undefined) {
			this.data[id] = defaultConfig;
		}
		this.save();
		return this.data[id] as Type;
	}

	public save(): void {
		fs.writeFileSync(this.fileName, yaml.dump(this.data));
	}

	public load(): void {
		let fileData: string;
		try {
			fileData = fs.readFileSync(this.fileName, 'utf8');
		} catch {
			fs.writeFileSync(this.fileName, '');
			return;
		}

		this.data = (yaml.load(fileData) as Data) || {};
	}
}
