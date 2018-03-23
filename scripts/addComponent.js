const fs = require('fs-extra');
const program = require('commander');
const { prompt } = require('inquirer'); // require inquirerjs library

async function setupNewComponent(componentType, componentName) {
  try {
    await fs.copy(
      './scripts/addComponentStarter/Component',
      `./src/${componentType}s/${componentName}`,
      {
        overwrite: false,
        errorOnExist: true
      }
    );
    console.log('success!');
  } catch (err) {
    console.error(err);
  }
}

const questions = [
  {
    type: 'input',
    name: 'componentName',
    message: 'What do you want to call this component?'
  },
  {
    type: 'list',
    name: 'componentType',
    message: 'What type of component are you making?',
    choices: ['atom', 'molecule', 'organism', 'template', 'page']
  }
];

program.version('0.0.1').description('floorplan Util');

program
  .command('addComponent')
  .alias('a')
  .description('Add a componet')
  .action(() => {
    prompt(questions).then(async answers => {
      console.log(
        `Creating ${answers.componentType} component ${answers.componentName}`
      );
      await setupNewComponent(answers.componentType, answers.componentName);
    });
  });

program.parse(process.argv);
