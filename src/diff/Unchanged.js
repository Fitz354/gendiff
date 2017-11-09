/*  eslint no-useless-constructor: 0  */

import Diff from './Diff';

export default class Unchanged extends Diff {
  constructor(key, value) {
    super(key, value);
  }

  toPlain(parent) {
    return this.value instanceof Array ? this.value.map(item => item.toPlain(`${parent}.${this.key}.`)).join('\n') : '';
  }

  toString(level) {
    const newValue = this.value instanceof Array ?
      `{\n${this.value.map(item => item.toString(level + 1)).join('\n')}\n${' '.repeat((level * 4) + 4)}}` : this.value;
    const intend = ' '.repeat(level * 4);

    return `${intend}    ${this.key}: ${newValue}`;
  }
}
