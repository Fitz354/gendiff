import yaml from 'js-yaml';
import ini from 'ini';

const getParser = (extname) => {
  switch (extname) {
    case '.json':
      return JSON.parse;
    case '.yml':
      return yaml.safeLoad;
    case '.ini':
      return ini.parse;
    default:
      return false;
  }
};

export default (str, extname) => {
  const parser = getParser(extname);

  return parser(str);
};
