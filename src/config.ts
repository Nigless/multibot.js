﻿import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

interface Data {
	[key: string]: unknown;
}

export default class Config<Type> {
	private data: Data;
	private pathToFile: string;

	constructor(pathToFile: string) {
		this.pathToFile = path.join(__dirname, `${pathToFile}.yml`);
		this.data = {};
		this.load();
	}

	public section(name: string, defaultConfig: Type): Type {
		if (this.data[name] === undefined) {
			this.data[name] = defaultConfig;
			this.save();
		}
		return this.data[name] as Type;
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

		this.data = (yaml.load(fileData) as Data) || {};
	}
}
