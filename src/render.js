/*  eslint object-curly-newline: 0  */
import { union, isObject } from 'lodash';
import buildDiff from './diff';

export default (firstFile, secondFile) => {
  const build = (file1, file2) => {
    const keys = union(Object.keys(file1), (Object.keys(file2)));

    return keys.map((item) => {
      const value1 = file1[item];
      const value2 = file2[item];

      return isObject(value1) && isObject(value2) ?
        { type: 'unchanged', key: item, value: build(value1, value2) } :
        buildDiff(item, value1, value2);
    });
  };

  return { type: 'unchanged', key: '', value: build(firstFile, secondFile) };
};
