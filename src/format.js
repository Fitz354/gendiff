/*  eslint object-curly-newline: 0  */
import { isObject } from 'lodash';

const formatProps = {
  unchanged: {
    getStr: (key, value) => `    ${key}: ${value}`,
    getPlain: () => '',
  },
  deleted: {
    getStr: (key, value) => `  - ${key}: ${value}`,
    getPlain: path => `Property '${path}' was removed`,
  },
  added: {
    getStr: (key, value) => `  + ${key}: ${value}`,
    getPlain: (path, value) => {
      const newValue = isObject(value) ? 'complex value' : `value: ${value}`;
      return `Property '${path}' was added with ${newValue}`;
    },
  },
  changed: {
    getStr: (key, value, value2, level) => `  + ${key}: ${value2}\n${' '.repeat(level * 4)}  - ${key}: ${value}`,
    getPlain: (path, value, value2) => {
      const newValue = isObject(value) ? 'complex value' : `'${value}'`;
      const newValue2 = isObject(value2) ? 'complex value' : `'${value2}'`;

      return `Property '${path}' was updated: From ${newValue} to ${newValue2}`;
    },
  },
};

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
    ast.map(({ type, key, value, value2, children }) => {
      const intend = ' '.repeat(level * 4);
      let newValue;
      let newValue2;

      if (type === 'unchanged' && children.length > 0) {
        const strChildren = build(children, level + 1);
        newValue = `{\n${strChildren}\n${intend}${' '.repeat(4)}}`;
      } else {
        newValue = isObject(value) ? getStrFromObject(value, level + 1) : value;
        newValue2 = isObject(value2) ? getStrFromObject(value2, level + 1) : value2;
      }

      return intend + formatProps[type].getStr(key, newValue, newValue2, level);
    }).join('\n');

  return `{\n${build(data, 0)}\n}`;
};

const toPlain = (data) => {
  const build = (ast, parent) =>
    ast.map(({ type, key, value, value2, children }) => {
      const path = parent ? `${parent}.${key}` : key;
      if (type === 'unchanged' && children.length > 0) {
        return build(children, path);
      }

      return formatProps[type].getPlain(path, value, value2);
    }).filter(str => str).join('\n');

  return build(data, '');
};

const toJson = (data) => {
  const build = (ast, acc) =>
    ast.reduce((newAcc, { type, key, value, value2, children }) => {
      if (type === 'unchanged' && children.length === 0) {
        return { ...newAcc };
      }
      switch (type) {
        case 'unchanged':
          return { ...newAcc, [key]: build(children, {}) };
        case 'changed':
          return { ...newAcc, [key]: { diff: type, from: value, to: value2 } };
        default:
          return { ...newAcc, [key]: { diff: type, value } };
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
