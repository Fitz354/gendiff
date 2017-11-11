/*  eslint object-curly-newline: 0  */

import render from '../src/ast';

test('check render', () => {
  const expected = [
    { type: 'changed', key: 'host', valueBefore: 'hexlet.io', valueAfter: 'hexlet' },
    { type: 'unchanged', key: 'timeout', valueBefore: 50, children: [] },
    { type: 'unchanged', key: 'val5', valueBefore: [1, 2, 3], children: [] },
    { type: 'unchanged',
      key: 'group1',
      valueBefore: '',
      children: [
        { type: 'unchanged', key: 'val1', valueBefore: 10, children: [] },
        { type: 'deleted', key: 'val3', valueBefore: false },
        { type: 'added', key: 'val2', valueAfter: true },
        { type: 'added', key: 'group2', valueAfter: { val3: 'value' } },
      ] },
    { type: 'changed', key: 'group5', valueBefore: { a: 10 }, valueAfter: 20 },
    { type: 'unchanged', key: 'value6', valueBefore: { a: 10, b: 20 }, children: [] },
    { type: 'changed', key: 'value7', valueBefore: [5, 6, 7], valueAfter: { a: 5 } },
  ];

  const before = {
    host: 'hexlet.io',
    timeout: 50,
    val5: [1, 2, 3],
    group1: {
      val1: 10,
      val3: false,
    },
    group5: {
      a: 10,
    },
    value6: {
      a: 10,
      b: 20,
    },
    value7: [5, 6, 7],
  };

  const after = {
    host: 'hexlet',
    timeout: 50,
    val5: [1, 2, 3],
    group1: {
      val1: 10,
      val2: true,
      group2: {
        val3: 'value',
      },
    },
    group5: 20,
    value6: {
      a: 10,
      b: 20,
    },
    value7: {
      a: 5,
    },
  };

  expect(render(before, after)).toEqual(expected);
});
