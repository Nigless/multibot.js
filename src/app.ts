import Cli from './apis/cli';
import Discord from './apis/discord';
import Config from './config';
import Parser from './parser';

const mainConfig = new Config('./config');
const parser = new Parser();
new Discord(parser, mainConfig);
new Cli(parser);
