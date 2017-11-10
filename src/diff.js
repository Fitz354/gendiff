/*  eslint object-curly-newline: 0  */
import { isObject, isUndefined, find, without } from 'lodash';

const diffProperties = [
  {
    typeDiff: 'unchanged',
    check: (value1, value2) => value1 === value2,
    getDiff: (keyDiff, val) => ({ type: 'unchanged', key: keyDiff, value: val }),
    getStr: (key, value) => `    ${key}: ${value}`,
  },
  {
    typeDiff: 'deleted',
    check: (value1, value2) => isUndefined(value2),
    getDiff: (keyDiff, val) => ({ type: 'deleted', key: keyDiff, value: val }),
    getStr: (key, value) => `  - ${key}: ${value}`,
    getPlain: path => `Property '${path}' was removed`,
  },
  {
    typeDiff: 'added',
    check: value1 => isUndefined(value1),
    getDiff: (keyDiff, val) => ({ type: 'added', key: keyDiff, value: val }),
    getStr: (key, value) => `  + ${key}: ${value}`,
    getPlain: (path, value) => {
      const newValue = isObject(value) ? 'complex value' : `value: ${value}`;
      return `Property '${path}' was added with ${newValue}`;
    },
  },
  {
    typeDiff: 'changed',
    check: (value1, value2) => value1 !== value2,
    getDiff: (keyDiff, val, val2) => ({
      type: 'changed', key: keyDiff, value: val, value2: val2,
    }),
    getStr: (key, value, value2, level) => `  + ${key}: ${value2}\n${' '.repeat(level * 4)}  - ${key}: ${value}`,
    getPlain: (path, value, value2) => {
      const newValue = isObject(value) ? 'complex value' : `'${value}'`;
      const newValue2 = isObject(value2) ? 'complex value' : `'${value2}'`;

      return `Property '${path}' was updated: From ${newValue} to ${newValue2}`;
    },
  },
];

export const getDiffProperties = type => find(diffProperties, ({ typeDiff }) => typeDiff === type);

export default (keyDiff, firstValue, secondValue) => {
  const { getDiff } = find(diffProperties, ({ check }) => check(firstValue, secondValue));
  const args = without([firstValue, secondValue], undefined);

  return getDiff(keyDiff, ...args);
};
