import commander from 'commander';

commander
  .version('0.1.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format');

export default () => commander.parse(process.argv);
