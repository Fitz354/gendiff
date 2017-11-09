import commander from 'commander';
import gendiff from '..';

commander
  .version('0.4.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action(function action(firstConfig, secondConfig) {
    console.log(gendiff(firstConfig, secondConfig, this.format));
  });

export default () => {
  commander.parse(process.argv);
};
