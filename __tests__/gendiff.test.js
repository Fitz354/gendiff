import gendiff from '../src';

describe('gendiff', () => {
  const expected = '{\n  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n+ verbose: true\n}';
  test('.json', () => {
    const path1 = '__tests__/fixtures/config1.json';
    const path2 = '__tests__/fixtures/config2.json';
    const actual = gendiff(path1, path2);

    expect(actual).toBe(expected);
  });

  test('.yml', () => {
    const path1 = '__tests__/fixtures/config1.yml';
    const path2 = '__tests__/fixtures/config2.yml';
    const actual = gendiff(path1, path2);

    expect(actual).toBe(expected);
  });

  test('.ini', () => {
    const path1 = '__tests__/fixtures/config1.ini';
    const path2 = '__tests__/fixtures/config2.ini';
    const actual = gendiff(path1, path2);

    expect(actual).toBe(expected);
  });
});
