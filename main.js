const { writeFileSync } = require("fs-extra");
const { join, resolve } = require("path");
const login = require("./Fca-Horizon-Remastered");
const logger = require("./Fca-Horizon-Remastered/logger");

global.client = new Object({
    mainPath: process.cwd()
});

logger.Normal("Đang Khởi Động Bot...");

try {
    var appStateFile = resolve(join(global.client.mainPath, 'appstate.json')),
        appState = require(appStateFile);
    logger.Normal("Đã Tìm Thấy File Appstate!");
} catch {
    logger.Normal("Không Tìm Thấy File Appstate!");
    process.exit(1);
}

function onBot() {
    const loginData = { appState };
    login(loginData, (loginError, loginApiData) => {
        if (loginError) return logger.Normal(JSON.stringify(loginError), `ERROR`);
        
        loginApiData.setOptions({
            forceLogin: true,
            listenEvents: true,
            pauseLog: true,
            logLevel: "silent",
            selfListen: true,
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
        });

        let loginState = loginApiData.getAppState();
        loginState = JSON.stringify(loginState, null, '\t');
        writeFileSync(appStateFile, loginState);
        global.client.api = loginApiData;

        const listener = require('./listen')({ api: loginApiData });

        function listenerCallback(error, message) {
            if (error) return logger.Normal("Đã Xảy Ra Lỗi Khi Lắng Nghe");
            return listener(message);
        }
        global.handleListen = loginApiData.listenMqtt(listenerCallback);
    });
}

onBot();