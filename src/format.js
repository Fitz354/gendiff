/*  eslint object-curly-newline: 0  */
import { isObject } from 'lodash';
import { getDiffProperties } from './diff';

const getStrFromObject = (value, level) => {
  const str = JSON.stringify(value, null, ' '.repeat(4)).replace(/[,"]/g, '');

  return str.split('\n').map((item, index) => {
    if (index === 0) {
      return item;
    }

    return `${' '.repeat(level * 4)}${item}`;
  }).join('\n');
};

const toPlain = (data) => {
  const build = ({ type, key, value, value2 }, parent) => {
    const path = parent ? `${parent}.${key}` : key;

    if (type === 'unchanged' && value instanceof Array) {
      const filtered = value.filter(({ type: typeDiff, value: val }) => {
        if (typeDiff === 'unchanged') {
          return val instanceof Array;
        }
        return true;
      });

      return filtered.map(item => build(item, path)).join('\n');
    }
    const { getPlain } = getDiffProperties(type);
    return getPlain(path, value, value2);
  };

  return build(data, '');
};

const toString = (data) => {
  const build = ({ type, key, value, value2 }, level) => {
    const intend = ' '.repeat(level * 4);
    let newValue;
    let newValue2;

    if (type === 'unchanged' && value instanceof Array) {
      const children = value.map(item => build(item, level + 1)).join('\n');
      newValue = `{\n${children}\n${intend}${' '.repeat(4)}}`;
    } else {
      newValue = isObject(value) ? getStrFromObject(value, level + 1) : value;
      newValue2 = isObject(value2) ? getStrFromObject(value2, level + 1) : value2;
    }
    const { getStr } = getDiffProperties(type);

    return intend + getStr(key, newValue, newValue2, level);
  };

  return `{\n${data.value.map(item => build(item, 0)).join('\n')}\n}`;
};

const formats = {
  defalut: toString,
  plain: toPlain,
};

export default format => formats[format];
