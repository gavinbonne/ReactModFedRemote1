const CopyPlugin = require('copy-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");


module.exports = options => {
    return {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            publicPath: "http://localhost:3002/",
            uniqueName: "reactMfeSandbox"
        },
        module: {
            rules: [
                {
                    test: /.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                                presets: ['@babel/react', '@babel/env']
                            }
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },
                // {
                //     test: /\.scss$/,
                //     use: [
                //         { loader: "style-loader" },
                //         { loader: "css-loader" },
                //         { loader: "sass-loader" }
                //     ]
                // },
            ],
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: 'public' }
                ]
            }),
            new ModuleFederationPlugin({
                name: "reactMfeSandbox",
                library: { type: "var", name: "reactMfeSandbox" },
                filename: "remoteEntry.js",
                exposes: {
                    './reactMfeInputOutput': './src/react-input-output/react-input-output.js',
                    './reactMfeTile': './src/react-tile/react-tile.js',
                    './reactMfeParent': './src/react-parent/react-parent.js',
                },
                shared: ["react", "react-dom", "react-router-dom"]
            })
        ],
        devServer: {
            port: 3002,
            historyApiFallback: true
        }
    }
}