/*  eslint object-curly-newline: 0  */
import { isUndefined, find, union, isObject } from 'lodash';

const diffProps = [
  {
    type: 'unchanged',
    check: (value, value2) => (isObject(value) && isObject(value2)) || value === value2,
    process: (value, value2, fn) => {
      if ((isObject(value) && isObject(value2))) {
        return { value: '', children: fn(value, value2) };
      }
      return { value, children: [] };
    },
  },
  {
    type: 'deleted',
    check: (value, value2) => isUndefined(value2),
    process: (...args) => ({ value: args[0] }),
  },
  {
    type: 'added',
    check: value => isUndefined(value),
    process: (...args) => ({ value: args[1] }),
  },
  {
    type: 'changed',
    check: (value1, value2) => value1 !== value2,
    process: (value, value2) => ({ value, value2 }),
  },
];

const getDiffProps =
  (firstValue, secondValue) => find(diffProps, ({ check }) => check(firstValue, secondValue));

const render = (firstFile, secondFile) => {
  const keys = union(Object.keys(firstFile), (Object.keys(secondFile)));

  return keys.map((key) => {
    const value = firstFile[key];
    const value2 = secondFile[key];
    const { type, process } = getDiffProps(value, value2);

    return { type, key, ...process(value, value2, render) };
  });
};

export default render;
