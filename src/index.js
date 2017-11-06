import commander from 'commander';
import { find } from 'lodash';
import fs from 'fs';

const diffProperties = [
  {
    name: 'unchange',
    check: ({ value1, value2 }) => value1 === value2,
    getDiff: ({ key, value1 }) => `  ${key}: ${value1}`,
  },
  {
    name: 'delete',
    check: ({ value2 }) => value2 === undefined,
    getDiff: ({ key, value1 }) => `- ${key}: ${value1}`,
  },
  {
    name: 'add',
    check: ({ value1 }) => value1 === undefined,
    getDiff: ({ key, value2 }) => `+ ${key}: ${value2}`,
  },
  {
    name: 'change',
    check: ({ value1, value2 }) => value1 !== value2,
    getDiff: ({ key, value1, value2 }) => `+ ${key}: ${value2}\n- ${key}: ${value1}`,
  },
];

const getDiffProperties = arg => find(diffProperties, ({ check }) => check(arg));

export const render = (pathToFile1, pathToFile2) => {
  const firstFile = JSON.parse(fs.readFileSync(pathToFile1, 'utf-8'));
  const secondFile = JSON.parse(fs.readFileSync(pathToFile2, 'utf-8'));
  const keys = new Set(Object.keys(firstFile).concat(Object.keys(secondFile)));

  return Array.from(keys).reduce((acc, item) => {
    const firstFileValue = firstFile[item];
    const secondFileValue = secondFile[item];
    const diff = { key: item, value1: firstFileValue, value2: secondFileValue };
    const { name } = getDiffProperties(diff);

    return { ...acc, [name]: diff };
  }, {});
};

export const parse = (data) => {
  const result = Object.keys(data).map((item) => {
    const { getDiff } = getDiffProperties(data[item]);

    return getDiff(data[item]);
  }).join('\n');
  return `{\n${result}\n}`;
};

const gendiff = (pathToFile1, pathToFile2) => parse(render(pathToFile1, pathToFile2));

commander
  .version('0.1.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig) => {
    console.log(gendiff(firstConfig, secondConfig));
  });

export default gendiff;
export const run = () => commander.parse(process.argv);
