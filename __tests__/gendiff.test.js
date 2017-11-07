import gendiff from '../src';
import parse from '../src/parser';

test('check parser', () => {
  const jsonExt = '.json';
  const jsonStr = '{\n"host": "hexlet.io",\n"timeout": 50\n}';

  const yamlExt = '.yml';
  const yamlStr = 'host: hexlet.io\ntimeout: 50';

  const expected = { host: 'hexlet.io', timeout: 50 };
  expect(parse(jsonStr, jsonExt)).toEqual(expected);
  expect(parse(yamlStr, yamlExt)).toEqual(expected);
});

test('check .json', () => {
  const path1 = '__tests__/fixtures/config1.json';
  const path2 = '__tests__/fixtures/config2.json';
  const expected = '{\n  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n+ verbose: true\n}';
  const actual = gendiff(path1, path2);

  expect(actual).toBe(expected);
});

test('check .yml', () => {
  const path1 = '__tests__/fixtures/config1.yml';
  const path2 = '__tests__/fixtures/config2.yml';
  const expected = '{\n  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n+ verbose: true\n}';
  const actual = gendiff(path1, path2);

  expect(actual).toBe(expected);
});
