import Diff from './Diff';

export default class Changed extends Diff {
  constructor(key, value, value2) {
    super(key, value);
    this.value2 = value2;
  }

  toString(level) {
    const newValue = this.value instanceof Object ? this.getStringValue(level) : this.value;
    const newValue2 =
      this.value2 instanceof Object ? this.getStringValue(level + 1, this.value2) : this.value2;
    const intend = ' '.repeat(level * 4);

    return `${intend}  + ${this.key}: ${newValue2}\n${intend}  - ${this.key}: ${newValue}`;
  }
}
