import { isUndefined, find, without } from 'lodash';
import Unchanged from './Unchanged';
import Changed from './Changed';
import Deleted from './Deleted';
import Added from './Added';

const diffProperties = [
  {
    DiffClass: Unchanged,
    check: (value1, value2) => value1 === value2,
  },
  {
    DiffClass: Deleted,
    check: (value1, value2) => isUndefined(value2),
  },
  {
    DiffClass: Added,
    check: value1 => isUndefined(value1),
  },
  {
    DiffClass: Changed,
    check: (value1, value2) => value1 !== value2,
  },
];

export default (key, value1, value2) => {
  const { DiffClass } = find(diffProperties, ({ check }) => check(value1, value2));
  const values = (without([value1, value2], undefined));

  return new DiffClass(key, ...values);
};
