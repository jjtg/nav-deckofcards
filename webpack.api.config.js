const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: "node",
    entry: {
        app: ["./src/routes/routes.js"]
    },
    output: {
        path: path.resolve(__dirname, "./build/api"),
        filename: "api-bundle.js"
    },
    externals: [nodeExternals()]
};

