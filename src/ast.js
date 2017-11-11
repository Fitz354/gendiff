/*  eslint object-curly-newline: 0  */
import { isUndefined, find, union, isEqual, isPlainObject } from 'lodash';

const diffProps = [
  {
    type: 'nested',
    check: (valueBefore, valueAfter) =>
      isPlainObject(valueBefore) && isPlainObject(valueAfter) && !isEqual(valueBefore, valueAfter),
    process: (valueBefore, valueAfter, fn) => ({ children: fn(valueBefore, valueAfter) }),
  },
  {
    type: 'unchanged',
    check: (valueBefore, valueAfter) =>
      valueBefore === valueAfter || isEqual(valueBefore, valueAfter),
    process: valueBefore => ({ valueBefore }),
  },
  {
    type: 'deleted',
    check: (valueBefore, valueAfter) => isUndefined(valueAfter),
    process: valueBefore => ({ valueBefore }),
  },
  {
    type: 'added',
    check: valueBefore => isUndefined(valueBefore),
    process: (valueBefore, valueAfter) => ({ valueAfter }),
  },
  {
    type: 'changed',
    check: (valueBefore, valueAfter) => valueBefore !== valueAfter,
    process: (valueBefore, valueAfter) => ({ valueBefore, valueAfter }),
  },
];

const getDiffProps =
  (valueBefore, valueAfter) => find(diffProps, ({ check }) => check(valueBefore, valueAfter));

const render = (firstFile, secondFile) => {
  const keys = union(Object.keys(firstFile), (Object.keys(secondFile)));

  return keys.map((key) => {
    const valueBefore = firstFile[key];
    const valueAfter = secondFile[key];
    const { type, process } = getDiffProps(valueBefore, valueAfter);

    return { type, key, ...process(valueBefore, valueAfter, render) };
  });
};

export default render;
