const { spawn } = require("child_process");

function startBot() {

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "main.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("error", (error) => {
        console.log("Đã Xảy Ra Lỗi: " + JSON.stringify(error));
    });
}

setTimeout(() => {
    startBot();
}, 70);