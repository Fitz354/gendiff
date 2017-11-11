/*  eslint object-curly-newline: 0  */
import { isObject } from 'lodash';

const getStrFromObject = (value, level) => {
  if (value instanceof Array) {
    return JSON.stringify(value);
  }
  const str = JSON.stringify(value, null, ' '.repeat(4)).replace(/[,"]/g, '');

  return str.split('\n').map((item, index) => {
    const newItem = index === 0 ? item : `${' '.repeat(level * 4)}${item}`;
    return newItem;
  }).join('\n');
};

const toString = (data) => {
  const build = (ast, level) =>
    ast.map(({ type, key, valueBefore, valueAfter, children }) => {
      const intend = ' '.repeat(level * 4);
      const newValueBefore =
        isObject(valueBefore) ? getStrFromObject(valueBefore, level + 1) : valueBefore;
      const newValueAfter =
        isObject(valueAfter) ? getStrFromObject(valueAfter, level + 1) : valueAfter;

      switch (type) {
        case 'nested':
          return `${intend}    ${key}: {\n${build(children, level + 1)}\n${intend}${' '.repeat(4)}}`;
        case 'unchanged':
          return `${intend}    ${key}: ${newValueBefore}`;
        case 'deleted':
          return `${intend}  - ${key}: ${newValueBefore}`;
        case 'added':
          return `${intend}  + ${key}: ${newValueAfter}`;
        case 'changed':
          return `${intend}  + ${key}: ${newValueAfter}\n${intend}  - ${key}: ${newValueBefore}`;
        default:
          return '';
      }
    }).join('\n');

  return `{\n${build(data, 0)}\n}`;
};

const toPlain = (data) => {
  const build = (ast, parent) =>
    ast.map(({ type, key, valueBefore, valueAfter, children }) => {
      const path = parent ? `${parent}.${key}` : key;
      const complexBefore = isObject(valueBefore) ? 'complex value' : '';
      const complexAfter = isObject(valueAfter) ? 'complex value' : '';

      switch (type) {
        case 'nested':
          return build(children, path);
        case 'deleted':
          return `Property '${path}' was removed`;
        case 'added':
          return `Property '${path}' was added with ${complexAfter || `value: ${valueAfter}`}`;
        case 'changed':
          return `Property '${path}' was updated: From ${complexBefore || `'${valueBefore}'`} to ${complexAfter || `'${valueAfter}'`}`;
        default:
          return '';
      }
    }).filter(str => str).join('\n');

  return build(data, '');
};

const toJson = (data) => {
  const build = (ast, acc) =>
    ast.reduce((newAcc, { type, key, valueBefore, valueAfter, children }) => {
      switch (type) {
        case 'nested':
          return { ...newAcc, [key]: build(children, {}) };
        case 'unchanged':
          return { ...newAcc };
        case 'changed':
          return { ...newAcc, [key]: { diff: type, from: valueBefore, to: valueAfter } };
        default:
          return { ...newAcc, [key]: { diff: type, value: valueBefore || valueAfter } };
      }
    }, acc);

  return JSON.stringify(build(data, {}));
};

const formats = {
  defalut: toString,
  plain: toPlain,
  json: toJson,
};

export default format => formats[format];
