import yaml from 'js-yaml';
import ini from 'ini';

const parserTypes = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (str, extname) => {
  const parser = parserTypes[extname];

  return parser(str);
};
