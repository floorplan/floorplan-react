const fs = require('fs-extra');
const program = require('commander');
const { prompt } = require('inquirer');
const replace = require('replace-in-file');

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

async function replaceComponentTypeAndName(componentType, componentName) {
  let options = {
    files: `./src/${componentType}s/${componentName}/**/*`,
    from: /ComponentName/g,
    to: componentName
  };

  try {
    const changes = await replace(options);
    console.log('Modified files:', changes.join(', '));
  } catch (error) {
    console.error('Error occurred:', error);
  }

  options = {
    files: `./src/${componentType}s/${componentName}/**/*`,
    from: /ComponentType/g,
    to: `${capitalizeFirstLetter(componentType)}s`
  };

  try {
    const changes = await replace(options);
    console.log('Modified files:', changes.join(', '));
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

function renameComponentFiles(componentType, componentName) {
  const componentPath = `./src/${componentType}s/${componentName}`;
  fs.renameSync(
    `${componentPath}/ComponentName.jsx`,
    `${componentPath}/${componentName}.jsx`
  );
  fs.renameSync(
    `${componentPath}/ComponentName.mdx`,
    `${componentPath}/${componentName}.mdx`
  );
  fs.renameSync(
    `${componentPath}/__tests__/ComponentName.spec.jsx`,
    `${componentPath}/__tests__/${componentName}.spec.jsx`
  );
}

async function setupNewComponent(componentType, componentName) {
  try {
    await fs.copy(
      './scripts/addComponentStarter/ComponentName',
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

program.version('0.0.1').description('Floorplan Util');

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
      renameComponentFiles(answers.componentType, answers.componentName);
      await replaceComponentTypeAndName(
        answers.componentType,
        answers.componentName
      );
    });
  });

program.parse(process.argv);
