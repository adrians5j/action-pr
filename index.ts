const core = require("@actions/core");
const exec = require("@actions/exec");
const prepareEnvFiles = require("./scripts/prepareEnvFiles");
const pingUntilDeployed = require("./scripts/pingUntilDeployed");

export const isPost = !!process.env["STATE_isPost"];


console.log('woaaaah 2', process.env["STATE_isPost"])
console.log('woaaaah', process.env)
async function deploy() {

    try {
        core.startGroup("Deploying Webiny Project");

        core.info(`Preparing ".env.json" files...`);
        await prepareEnvFiles();

        core.info(`✨ Deploying API...`);
        await exec.exec("yarn webiny deploy-api --env devZZZ --debug");

        /*core.info(`✨ Deploying Apps...`);
        await exec.exec("yarn webiny deploy-apps --env dev --debug");

        core.info(`⏳ Waiting for the project to become available...`);
        await pingUntilDeployed();*/

        core.info(`🎉 Project deployed and ready.`);

        core.endGroup();
    } catch (e) {
        core.setFailed(e.message);
    }
}

async function remove() {
    try {
        core.startGroup("Removing Webiny Project");

        core.info(`✨ Removing API...`);
        await exec.exec("yarn webiny remove-api --env dev --debug");

        core.info(`✨ Removing Apps...`);
        await exec.exec("yarn webiny remove-apps --env dev --debug");

        core.info(`🎉 Project removed successfully.`);

        core.endGroup();
    } catch (e) {
        core.setFailed(e.message);
    }
}

if (isPost) {
    remove();
} else {
    deploy();
}
