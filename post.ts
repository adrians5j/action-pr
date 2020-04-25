(async () => {
    const core = require("@actions/core");
    const exec = require("@actions/exec");

    try {
        core.startGroup("Removing Webiny Project");

        core.info(`✨ Removing API...`);
        await exec.exec("node ../node_modules/@webiny/cli/bin.js remove-api --env dev --debug", [], {
            cwd: "./examples"
        });

        core.info(`✨ Removing Apps...`);
        await exec.exec("node ../node_modules/@webiny/cli/bin.js remove-apps --env dev --debug", [], {
            cwd: "./examples"
        });

        core.info(`🎉 Project removed successfully.`);

        core.endGroup();
    } catch (e) {
        core.setFailed(e.message);
    }
})();
