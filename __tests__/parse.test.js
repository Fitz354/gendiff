import parse from '../src/parser';

describe('check parser', () => {
  const expected = { host: 'hexlet.io', timeout: 50 };

  test('.json', () => {
    const jsonExt = '.json';
    const jsonStr = '{\n"host": "hexlet.io",\n"timeout": 50\n}';
    expect(parse(jsonStr, jsonExt)).toEqual(expected);
  });

  test('.yml', () => {
    const yamlExt = '.yml';
    const yamlStr = 'host: hexlet.io\ntimeout: 50';

    expect(parse(yamlStr, yamlExt)).toEqual(expected);
  });

  test('.ini', () => {
    const iniExt = '.ini';
    const iniStr = 'host=hexlet.io\ntimeout=50';
    const expectedIni = { host: 'hexlet.io', timeout: '50' };

    expect(parse(iniStr, iniExt)).toEqual(expectedIni);
  });
});
