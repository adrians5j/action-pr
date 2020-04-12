const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");
const prepareEnvFiles = require("./scripts/prepareEnvFiles");

(async function execute() {
    try {
        core.info(`Installing dependencies...`);
        await exec.exec("yarn");

        core.info(`Checking if all dependencies are in order...`);
        await exec.exec("yarn adio");

        core.info(`Building all packages...`);
        await exec.exec("yarn lerna run build --stream");

        core.info(`Running Jest tests...`);
        await exec.exec("yarn test");

        // This part below is TODO - need to finish Cypress installation test first.

        core.startGroup("[TODO] Deploying to AWS and testing...");

        core.info(`[TODO] Setting up .env files...`);
        await prepareEnvFiles();

        core.info(`[TODO] Deploy API...`);

        core.info(`[TODO] Deploy Apps...`);

        core.info(`[TODO] Setting up Cypress environment variables...`);

        core.info(`[TODO] Running Cypress installation tests...`);

        core.info(`[TODO]  Running Cypress tests...`);

        core.endGroup();
    } catch (e) {
        core.setFailed(e.message);
    }
})();
