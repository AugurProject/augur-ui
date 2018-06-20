const shell = require('shelljs');
const colors = require('./common/colors');
const readline = require('readline');

process.env.NODE_ENV = process.env.BABEL_ENV = 'integration';

const exec = require('child_process').exec;

shell.echo(`
  ${colors.title(`== Running All Integration Tests ==\n`)}
`);

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

async function promisifyExec (cmdToRun) {
  return new Promise((resolve, reject)=> {
    const it = exec(cmdToRun, (err, stdout) => {
      if(err !== null) return reject(err)
      resolve(stdout)
    })

    it.stdout.on( 'data', data => {
      console.log( `stdout: ${data}` );
    })

    it.stderr.on( 'data', data => {
      console.log( `stderr: ${data}` );
    })

    it.on( 'close', code => {
      console.log( `child process exited with code ${code}` );
    })
  })
}

// Find test files.
const files = shell.find('integration').filter(function(file) { return file.match(/\.test\.ts$/); });

// Run each file within a separate docker-compose environment.
const cb = async (filepath) => {
  process.stdout.write(
    colors.notice(`${filepath}:\t\t\tRunning...\n`)
  );

  try {
    await promisifyExec(`npm run docker:integration ${filepath}`)
  } catch (e) {
    readline.clearLine();
    readline.cursorTo(0);
    process.stdout.write(
      colors.error(`${filepath}:\t\t\tFailed!\n\n`)
    );

    console.error(e);
    process.exit(1);
  } finally {
    // Teardown stack between runs.
    await promisifyExec(`npm run docker:integration:down`)
  }

  readline.clearLine();
  readline.cursorTo(0);
  process.stdout.write(
    colors.dim(`${filepath}:\t\t\tPassed!\n\n`)
  );
}

asyncForEach(files, cb)
