/*  eslint no-useless-constructor: 0  */
import { isObject } from 'lodash';
import Diff from './Diff';

export default class Added extends Diff {
  constructor(key, value) {
    super(key, value);
  }

  toPlain(parent) {
    const newValue = isObject(this.value) ? 'complex value' : `value: ${this.value}`;
    return `Property '${parent}${this.key}' was added with ${newValue}`;
  }

  toString(level) {
    const newValue = isObject(this.value) ? this.getStringValue(level + 1) : this.value;
    const intend = ' '.repeat(level * 4);

    return `${intend}  + ${this.key}: ${newValue}`;
  }
}
