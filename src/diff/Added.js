/*  eslint no-useless-constructor: 0  */

import Diff from './Diff';

export default class Added extends Diff {
  constructor(key, value) {
    super(key, value);
  }
}
