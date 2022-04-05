const { fork, execSync } = require('child_process');

const runForkCommand  = async command =>  {
    try {
        fork(`${command}`,{stdio: 'inherit'}); // inheriting the logs to capture incase of an error
       return true;
    } catch(e) {
        console.error(`Failed to execute ${command}`, e);
        return false;
    }
   
}
const runCommand  = command => {
    try {
        execSync(`${command}`,{stdio: 'inherit'});
    } catch(e) {
        console.error(`Failed to execute ${command}`, e);
        return false;
    }
    return true;
}

// Start the Demo App using fork
const startAppCmd = "index.js";
const appStarted = runForkCommand(startAppCmd);
console.log(appStarted.pid);
if (!appStarted) process.exit();

// Change the process directory and start the tests
process.chdir("./ui_tests");
const startTest = "npm run wdio"
const Testrunning = runCommand(startTest);
if (!Testrunning) process.exit();

// Gracefully exiting the process
process.on('SIGINT', function (){
    process.exit();
});
