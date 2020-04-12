const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

(async function execute() {
    try {
        // Install all dependencies.
        await exec.exec("yarn");
        await exec.exec("adio");
    } catch (error) {
        core.setFailed(error.message);
    }
})();
