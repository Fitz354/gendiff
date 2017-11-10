import gendiff from '../src';

describe('gendiff', () => {
  const expected =
  '{\n' +
  '    host: hexlet.io\n' +
  '  + timeout: 20\n' +
  '  - timeout: 50\n' +
  '  - proxy: 123.234.53.22\n' +
  '  + verbose: true\n' +
  '}';

  const expected2 =
  '{\n' +
  '    common: {\n' +
  '        setting1: Value 1\n' +
  '      - setting2: 200\n' +
  '        setting3: true\n' +
  '      - setting6: {\n' +
  '            key: value\n' +
  '        }\n' +
  '      + setting4: blah blah\n' +
  '      + setting5: {\n' +
  '            key5: value5\n' +
  '        }\n' +
  '    }\n' +
  '    group1: {\n' +
  '      + baz: bars\n' +
  '      - baz: bas\n' +
  '        foo: bar\n' +
  '    }\n' +
  '  - group2: {\n' +
  '        abc: 12345\n' +
  '    }\n' +
  '  + group3: {\n' +
  '        fee: 100500\n' +
  '    }\n' +
  '}';

  const expectedPlain =
  'Property \'timeout\' was updated: From \'50\' to \'20\'\n' +
  'Property \'proxy\' was removed\n' +
  'Property \'verbose\' was added with value: true';

  const expectedPlain2 =
  'Property \'common.setting2\' was removed\n' +
  'Property \'common.setting6\' was removed\n' +
  'Property \'common.setting4\' was added with value: blah blah\n' +
  'Property \'common.setting5\' was added with complex value\n' +
  'Property \'group1.baz\' was updated: From \'bas\' to \'bars\'\n' +
  'Property \'group2\' was removed\n' +
  'Property \'group3\' was added with complex value';

  const expectedJson =
  '{' +
    '"timeout":{' +
      '"diff":"changed",' +
      '"from":50,' +
      '"to":20' +
    '},' +
    '"proxy":{' +
      '"diff":"deleted",' +
      '"value":"123.234.53.22"' +
    '},' +
    '"verbose":{' +
      '"diff":"added",' +
      '"value":true' +
    '}' +
  '}';

  const expectedJson2 =
  '{' +
    '"common":{' +
      '"setting2":{' +
        '"diff":"deleted",' +
        '"value":"200"' +
      '},' +
      '"setting6":{' +
        '"diff":"deleted",' +
        '"value":{' +
          '"key":"value"' +
        '}' +
      '},' +
      '"setting4":{' +
        '"diff":"added",' +
        '"value":"blah blah"' +
      '},' +
      '"setting5":{' +
        '"diff":"added",' +
        '"value":{' +
          '"key5":"value5"' +
        '}' +
      '}' +
    '},' +
    '"group1":{' +
      '"baz":{' +
        '"diff":"changed",' +
        '"from":"bas",' +
        '"to":"bars"' +
      '}' +
    '},' +
    '"group2":{' +
      '"diff":"deleted",' +
      '"value":{' +
        '"abc":"12345"' +
      '}' +
    '},' +
    '"group3":{' +
      '"diff":"added",' +
      '"value":{' +
        '"fee":"100500"' +
      '}' +
    '}' +
  '}';

  test('.json', () => {
    const path1 = '__tests__/fixtures/config1.json';
    const path2 = '__tests__/fixtures/config2.json';
    const actual = gendiff(path1, path2);
    const actualPlain = gendiff(path1, path2, 'plain');
    const actualJson = gendiff(path1, path2, 'json');

    expect(actual).toBe(expected);
    expect(actualPlain).toBe(expectedPlain);
    expect(actualJson).toBe(expectedJson);
  });

  test('.json2', () => {
    const path3 = '__tests__/fixtures/config3.json';
    const path4 = '__tests__/fixtures/config4.json';
    const actual = gendiff(path3, path4);
    const actualPlain = gendiff(path3, path4, 'plain');
    const actualJson = gendiff(path3, path4, 'json');

    expect(actual).toBe(expected2);
    expect(actualPlain).toBe(expectedPlain2);
    expect(actualJson).toBe(expectedJson2);
  });

  test('.yml', () => {
    const path1 = '__tests__/fixtures/config1.yml';
    const path2 = '__tests__/fixtures/config2.yml';
    const actual = gendiff(path1, path2);
    const actualPlain = gendiff(path1, path2, 'plain');
    const actualJson = gendiff(path1, path2, 'json');

    expect(actual).toBe(expected);
    expect(actualPlain).toBe(expectedPlain);
    expect(actualJson).toBe(expectedJson);
  });

  test('.yml2', () => {
    const path3 = '__tests__/fixtures/config3.yml';
    const path4 = '__tests__/fixtures/config4.yml';
    const actual = gendiff(path3, path4);
    const actualPlain = gendiff(path3, path4, 'plain');
    const actualJson = gendiff(path3, path4, 'json');

    expect(actual).toBe(expected2);
    expect(actualPlain).toBe(expectedPlain2);
    expect(actualJson).toBe(expectedJson2);
  });

  test('.ini', () => {
    const path1 = '__tests__/fixtures/config1.ini';
    const path2 = '__tests__/fixtures/config2.ini';
    const actual = gendiff(path1, path2);
    const actualPlain = gendiff(path1, path2, 'plain');
    const actualJson = gendiff(path1, path2, 'json');
    const expectedJsonIni =
    '{' +
      '"timeout":{' +
        '"diff":"changed",' +
        '"from":"50",' +
        '"to":"20"' +
      '},' +
      '"proxy":{' +
        '"diff":"deleted",' +
        '"value":"123.234.53.22"' +
      '},' +
      '"verbose":{' +
        '"diff":"added",' +
        '"value":true' +
      '}' +
    '}';

    expect(actual).toBe(expected);
    expect(actualPlain).toBe(expectedPlain);
    expect(actualJson).toBe(expectedJsonIni);
  });

  test('.ini2', () => {
    const path3 = '__tests__/fixtures/config3.ini';
    const path4 = '__tests__/fixtures/config4.ini';
    const actual = gendiff(path3, path4);
    const actualPlain = gendiff(path3, path4, 'plain');
    const actualJson = gendiff(path3, path4, 'json');

    expect(actual).toBe(expected2);
    expect(actualPlain).toBe(expectedPlain2);
    expect(actualJson).toBe(expectedJson2);
  });
});
