/*  eslint no-useless-constructor: 0  */

import Diff from './Diff';

export default class Deleted extends Diff {
  constructor(key, value) {
    super(key, value);
  }

  toString(level) {
    const newValue = this.value instanceof Object ? this.getStringValue(level + 1) : this.value;
    const intend = ' '.repeat(level * 4);

    return `${intend}  - ${this.key}: ${newValue}`;
  }
}
