import Diff from './Diff';

export default class Changed extends Diff {
  constructor(key, value1, value2) {
    super(key, value1);
    this.value2 = value2;
  }
}
