import parse from '../src/parser';

describe('check parser', () => {
  const expected = { host: 'hexlet.io', timeout: 50 };
  const expected2 = {
    host: 'hexlet.io',
    timeout: 50,
    group1: {
      val1: 10,
      val2: true,
      group2: {
        val3: 'value',
      },
    },
  };

  test('.json', () => {
    const jsonExt = '.json';
    const jsonStr = '{\n"host": "hexlet.io",\n"timeout": 50\n}';
    const jsonStr2 =
    '{\n' +
    ' "host": "hexlet.io",\n' +
    ' "timeout": 50,\n' +
    ' "group1": {\n' +
    '   "val1": 10,\n' +
    '    "val2": true,\n' +
    '    "group2": {\n' +
    '      "val3": "value"\n' +
    '    }\n' +
    '  }\n' +
    '}';

    expect(parse(jsonStr, jsonExt)).toEqual(expected);
    expect(parse(jsonStr2, jsonExt)).toEqual(expected2);
  });

  test('.yml', () => {
    const yamlExt = '.yml';
    const yamlStr = 'host: hexlet.io\ntimeout: 50';
    const yamlStr2 =
    'host: hexlet.io\n' +
    'timeout: 50\n' +
    'group1:\n' +
    '  val1: 10\n' +
    '  val2: true\n' +
    '  group2:\n' +
    '    val3: value\n';

    expect(parse(yamlStr, yamlExt)).toEqual(expected);
    expect(parse(yamlStr2, yamlExt)).toEqual(expected2);
  });

  test('.ini', () => {
    const iniExt = '.ini';
    const iniStr = 'host=hexlet.io\ntimeout=50';
    const iniStr2 =
    'host=hexlet.io\n' +
    'timeout=50\n' +
    '[group1]\n' +
    'val1=10\n' +
    'val2=true\n' +
    '[group1.group2]\n' +
    'val3=value\n';

    const expectedIni = { host: 'hexlet.io', timeout: '50' };
    const expectedIni2 = {
      host: 'hexlet.io',
      timeout: '50',
      group1: {
        val1: '10',
        val2: true,
        group2: {
          val3: 'value',
        },
      },
    };

    expect(parse(iniStr, iniExt)).toEqual(expectedIni);
    expect(parse(iniStr2, iniExt)).toEqual(expectedIni2);
  });
});
