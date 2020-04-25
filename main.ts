const prepareEnvFiles = require("./scripts/prepareEnvFiles");
const pingUntilDeployed = require("./scripts/pingUntilDeployed");

(async () => {
    const core = require("@actions/core");
    const exec = require("@actions/exec");

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
})();
