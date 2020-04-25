const got = require("got");

const wait = () => {
    return new Promise(resolve => {
        setTimeout(resolve, 10000);
    });
};

const ping = async () => {
    while (true) {
        try {
            await got("https://da5lorwi7xs7g.cloudfront.net");
            break;
        } catch (e) {
            console.log('ee', e)
            console.log("error", e.code);
            if (e.code !== "ENOTFOUND") {
                console.log('wohooo!')
                break;
            }
            console.log("Not yet!");
            await wait();
        }
    }

    return true;
};
