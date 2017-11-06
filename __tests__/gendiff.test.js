import gendiff from '..';

const path1 = '__tests__/fixtures/json1.json';
const path2 = '__tests__/fixtures/json2.json';

test('check', () => {
  const expected = '{\n  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n+ verbose: true\n}';
  const actual = gendiff(path1, path2);

  expect(actual).toBe(expected);
});
