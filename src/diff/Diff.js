export default class Diff {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  getStringValue(level, value = this.value) {
    const str = JSON.stringify(value, null, ' '.repeat(4)).replace(/[,"]/g, '');

    return str.split('\n').map((item, index) => {
      if (index === 0) {
        return item;
      }

      return `${' '.repeat(level * 4)}${item}`;
    }).join('\n');
  }

  toPlain() {
    return this.value.map(item => item.toPlain('')).join('\n');
  }

  toString(level = 0) {
    const newValue = this.value.map(item => item.toString(level)).join('\n');

    return `{\n${newValue}\n}`;
  }
}
