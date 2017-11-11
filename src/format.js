/*  eslint object-curly-newline: 0  */
import { isObject } from 'lodash';

const getStrFromObject = (value, level) => {
  const str = JSON.stringify(value, null, ' '.repeat(4)).replace(/[,"]/g, '');

  return str.split('\n').map((item, index) => {
    if (index === 0) {
      return item;
    }
    return index === 0 ? item : `${' '.repeat(level * 4)}${item}`;
  }).join('\n');
};

const toString = (data) => {
  const build = (ast, level) =>
    ast.map(({ type, key, valueBefore, valueAfter, children }) => {
      const intend = ' '.repeat(level * 4);
      let newValueBefore;
      let newValueAfter;

      if (type === 'unchanged' && children.length > 0) {
        const strChildren = build(children, level + 1);
        newValueBefore = `{\n${strChildren}\n${intend}${' '.repeat(4)}}`;
      } else {
        newValueBefore =
          isObject(valueBefore) ? getStrFromObject(valueBefore, level + 1) : valueBefore;
        newValueAfter = isObject(valueAfter) ? getStrFromObject(valueAfter, level + 1) : valueAfter;
      }
      switch (type) {
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
      if (type === 'unchanged' && children.length > 0) {
        return build(children, path);
      }
      let newValueBefore;
      let newValueAfter;

      switch (type) {
        case 'deleted':
          return `Property '${path}' was removed`;
        case 'added':
          newValueAfter = isObject(valueAfter) ? 'complex value' : `value: ${valueAfter}`;
          return `Property '${path}' was added with ${newValueAfter}`;
        case 'changed':
          newValueBefore = isObject(valueBefore) ? 'complex value' : `'${valueBefore}'`;
          newValueAfter = isObject(valueAfter) ? 'complex value' : `'${valueAfter}'`;
          return `Property '${path}' was updated: From ${newValueBefore} to ${newValueAfter}`;
        default:
          return '';
      }
    }).filter(str => str).join('\n');

  return build(data, '');
};

const toJson = (data) => {
  const build = (ast, acc) =>
    ast.reduce((newAcc, { type, key, valueBefore, valueAfter, children }) => {
      if (type === 'unchanged' && children.length === 0) {
        return { ...newAcc };
      }
      switch (type) {
        case 'unchanged':
          return { ...newAcc, [key]: build(children, {}) };
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
