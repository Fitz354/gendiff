import { render, parse } from '..';

const path1 = 'src/test/configs/json1.json';
const path2 = 'src/test/configs/json2.json';

test('check', () => {
  const data = {
    unchange: { key: 'host', value1: 'hexlet.io', value2: 'hexlet.io' },
    change: { key: 'timeout', value1: 50, value2: 20 },
    delete: { key: 'proxy', value1: '123.234.53.22', value2: undefined },
    add: { key: 'verbose', value1: undefined, value2: true },
  };
  const expected = '{\n  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n+ verbose: true\n}';
  const actual = parse(render(path1, path2));

  expect(render(path1, path2)).toEqual(data);
  expect(actual).toBe(expected);
});
