(async () => {
    const core = require("@actions/core");
    const exec = require("@actions/exec");

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
})();
