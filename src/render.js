import { union, isObject } from 'lodash';
import Diff from './diff/Diff';
import buildDiff from './diff/buildDiff';
import Unchanged from './diff/Unchanged';

export default (firstFile, secondFile) => {
  const build = (file1, file2) => {
    const keys = union(Object.keys(file1), (Object.keys(file2)));

    return keys.map((key) => {
      const value1 = file1[key];
      const value2 = file2[key];

      return isObject(value1) && isObject(value2) ?
        new Unchanged(key, build(value1, value2)) :
        buildDiff(key, value1, value2);
    });
  };

  return new Diff('', build(firstFile, secondFile));
};
