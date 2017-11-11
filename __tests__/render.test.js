/*  eslint object-curly-newline: 0  */

import render from '../src/ast';

test('check render', () => {
  const expected = [
    { type: 'changed', key: 'host', value: 'hexlet.io', value2: 'hexlet' },
    { type: 'unchanged', key: 'timeout', value: 50, children: [] },
    { type: 'unchanged', key: 'val5', value: [1, 2, 3], children: [] },
    { type: 'unchanged',
      key: 'group1',
      value: '',
      children: [
        { type: 'unchanged', key: 'val1', value: 10, children: [] },
        { type: 'deleted', key: 'val3', value: false },
        { type: 'added', key: 'val2', value: true },
        { type: 'added', key: 'group2', value: { val3: 'value' } },
      ] },
    { type: 'changed', key: 'group5', value: { a: 10 }, value2: 20 },
    { type: 'unchanged', key: 'value6', value: { a: 10, b: 20 }, children: [] },
    { type: 'changed', key: 'value7', value: [5, 6, 7], value2: { a: 5 } },
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
