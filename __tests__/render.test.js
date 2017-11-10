import render from '../src/render';

test('check render', () => {
  const expected = {
    type: 'unchanged',
    key: '',
    value: [
      {
        type: 'changed', key: 'host', value: 'hexlet.io', value2: 'hexlet',
      },
      {
        type: 'unchanged', key: 'timeout', value: 50,
      },
      {
        type: 'unchanged',
        key: 'group1',
        value: [
          {
            type: 'unchanged', key: 'val1', value: 10,
          },
          {
            type: 'deleted', key: 'val3', value: false,
          },
          {
            type: 'added', key: 'val2', value: true,
          },
          {
            type: 'added', key: 'group2', value: { val3: 'value' },
          },
        ],
      },
      {
        type: 'changed', key: 'group5', value: { a: 10 }, value2: 20,
      },
    ],
  };

  const before = {
    host: 'hexlet.io',
    timeout: 50,
    group1: {
      val1: 10,
      val3: false,
    },
    group5: {
      a: 10,
    },
  };

  const after = {
    host: 'hexlet',
    timeout: 50,
    group1: {
      val1: 10,
      val2: true,
      group2: {
        val3: 'value',
      },
    },
    group5: 20,
  };

  expect(render(before, after)).toEqual(expected);
});
