import yaml from 'js-yaml';

const getParser = (extname) => {
  switch (extname) {
    case '.json':
      return JSON.parse;
    case '.yml':
      return yaml.safeLoad;
    default:
      return false;
  }
};

export default (str, extname) => {
  const parser = getParser(extname);

  return parser(str);
};
