import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

export type Section = Record<string, string>;

export default class Config<Type = Section> {
	private data: Record<string, Type>;
	private pathToFile: string;

	constructor(pathToFile: string) {
		this.pathToFile = path.join(__dirname, `${pathToFile}.yml`);
		this.data = {};
		this.load();
	}

	public section<LocalConfig extends Type>(
		name: string,
		defaultConfig: LocalConfig,
	): LocalConfig {
		if (this.data[name] === undefined) {
			this.data[name] = defaultConfig;
			this.save();
		}
		return this.data[name] as LocalConfig;
	}

	public save(): void {
		fs.writeFileSync(this.pathToFile, yaml.dump(this.data));
	}

	public load(): void {
		let fileData: string;
		try {
			fileData = fs.readFileSync(this.pathToFile, 'utf8');
		} catch {
			fs.writeFileSync(this.pathToFile, '');
			return;
		}

		this.data = (yaml.load(fileData) as Record<string, Type>) || {};
	}
}
