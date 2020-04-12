const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");
const prepareEnvFiles = require("./scripts/prepareEnvFiles");

(async function execute() {
    try {
        // Install all dependencies.
        await exec.exec("yarn");

        // Prepare environment files.
        await prepareEnvFiles();
    return;
        // Run build of all packages.
        await exec.exec("yarn lerna run build --stream");

        // Check if all dependencies are in order.
        await exec.exec("yarn adio");

        // Run tests.
        await exec.exec("yarn test");

    } catch (error) {
        core.setFailed(error.message);
    }
})();
