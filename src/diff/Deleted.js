/*  eslint no-useless-constructor: 0  */

import Diff from './Diff';

export default class Deleted extends Diff {
  constructor(key, value) {
    super(key, value);
  }
}
