import fs from 'fs';
import path from 'path';
import { find, union } from 'lodash';
import parse from './parser';

const diffProperties = [
  {
    type: 'unchanged',
    check: ({ value1, value2 }) => value1 === value2,
    getDiff: ({ key, value1 }) => `  ${key}: ${value1}`,
  },
  {
    type: 'deleted',
    check: ({ value2 }) => value2 === undefined,
    getDiff: ({ key, value1 }) => `- ${key}: ${value1}`,
  },
  {
    type: 'added',
    check: ({ value1 }) => value1 === undefined,
    getDiff: ({ key, value2 }) => `+ ${key}: ${value2}`,
  },
  {
    type: 'changed',
    check: ({ value1, value2 }) => value1 !== value2,
    getDiff: ({ key, value1, value2 }) => `+ ${key}: ${value2}\n- ${key}: ${value1}`,
  },
];

const getDiffProperties = arg => find(diffProperties, ({ check }) => check(arg));

const render = (firstFile, secondFile) => {
  const keys = union(Object.keys(firstFile), (Object.keys(secondFile)));

  return Array.from(keys).reduce((acc, item) => {
    const firstFileValue = firstFile[item];
    const secondFileValue = secondFile[item];
    const diff = { key: item, value1: firstFileValue, value2: secondFileValue };
    const { type } = getDiffProperties(diff);

    return { ...acc, [type]: diff };
  }, {});
};

const toString = (data) => {
  const result = Object.keys(data).map((item) => {
    const { getDiff } = getDiffProperties(data[item]);

    return getDiff(data[item]);
  }).join('\n');
  return `{\n${result}\n}`;
};

export default (pathToFile1, pathToFile2) => {
  const firstFileStr = fs.readFileSync(pathToFile1, 'utf-8');
  const secondFileStr = fs.readFileSync(pathToFile2, 'utf-8');
  const firstFileExtension = path.extname(pathToFile1);
  const secondFileExtension = path.extname(pathToFile2);

  const firstFile = parse(firstFileStr, firstFileExtension);
  const secondFile = parse(secondFileStr, secondFileExtension);

  return toString(render(firstFile, secondFile));
};
