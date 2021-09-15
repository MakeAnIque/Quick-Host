const { exec } = require('child_process');

const chalk = require('chalk');

const commandArray = [
  {
    command: 'npm i -g husky',
    option: {},
    message: 'Husky Globally Installed.',
  },
  {
    command: `husky add .husky/commit-msg "npx commitlint --edit $1"`,
    option: {},
    message: 'Git Commit Validator Installed.',
  },
  {
    command: `husky add .husky/pre-commit "npm test"`,
    option: {},
    message: 'Husky Pre-Commit Configured.',
  },
];

/************************************************************************************************
 * POST-INSTALL -> MODULE - 1
 */

/****************************************************************
 * CONFIGURE: Module -> Husky
 * husky linter script
 * install husky before
 */

const isCi = process.env.CI !== undefined;

if (!isCi) {
  require('husky').install();
}

/************************************************************************************************
 * Execute Post Install Commands
 */
function executePostInstallCommand(commandListArray, index) {
  new Promise((resolve, reject) => {
    const { command, option, message } = commandListArray[index];

    Logger(
      `${chalk.gray(new Date().toISOString())} ${chalk.bgGray(
        chalk.whiteBright(command)
      )}`,
      'WARNING'
    );

    exec(command, option, (error, stdout, stderr) => {
      handleSTDResponseAndExecuteNextFunc({
        error,
        stdout,
        stderr,
        message,
        resolve,
        reject,
        callback: (resolve) => {
          Logger(
            `${chalk.gray(new Date().toISOString())} ${chalk.green(message)}`,
            'SUCCESS'
          );

          resolve(++index);
        },
      });
    });
  })
    .then((increment) => {
      if (increment >= commandListArray.length) return;

      executePostInstallCommand(commandListArray, increment);
    })
    .catch((error) =>
      Logger(
        `${chalk.gray(new Date().toISOString())}  ${chalk.red(`${error}`)}`,
        'ERROR'
      )
    );
}

/********************************
 * call first time execution command
 */

executePostInstallCommand(commandArray, 0);
/********************************
 * Handle Std -> Output, Error, StdError
 *
 */

function handleSTDResponseAndExecuteNextFunc(callbackObject) {
  const { error, stderr, stdout, resolve, reject, callback } =
    callbackObject || {};
  if (error) reject(error);

  if (stderr) reject(stderr);

  if (callback) {
    Logger(chalk.whiteBright(stdout));
    return callback(resolve, reject, stdout);
  }
}

function Logger(message, type) {
  console.error();

  switch (type) {
    case 'ERROR':
      console.log(chalk.bgRed('ERROR '), message);
      break;
    case 'SUCCESS':
      console.log(chalk.bgGreen(chalk.black.bold('SUCCESS ')), message);
      break;
    case 'WARNING':
      console.log(chalk.bgYellow(chalk.black.bold('START ')), message);
      break;
    default:
      console.log(message);
  }
}
