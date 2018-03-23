const program = require('commander');
const { prompt } = require('inquirer'); // require inquirerjs library

const questions = [
  {
    type: 'input',
    name: 'componentType',
    message: 'What type of component are you making?'
  },
  {
    type: 'input',
    name: 'componentName',
    message: 'What do you want to call this component?'
  },
];

program.version('0.0.1').description('floorplan Util');

program
  .command('addNewComponent') // No need of specifying arguments here
  .alias('a')
  .description('Add a componet')
  .action(() => {
    prompt(questions).then(answers =>
      console.log(JSON.stringify(answers, null, 2))
    );
  });

program.parse(process.argv);
