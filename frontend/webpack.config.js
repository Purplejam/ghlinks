require("dotenv").config()

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

module.exports = {
    mode: "development",
    entry: "./src/app.component.tsx",
    devServer: {
        port: process.env.WEBPACK_SERVER_PORT,
        proxy: {
            "/api": process.env.BACK_END_API_URL,
            "/assets": {
                target: "localhost",
                secure: false,
                bypass: request => request.originalUrl
            },
            "/": {
                target: "localhost",
                secure: false,
                bypass: request => {
                    if(request.headers.accept.indexOf("html") !== -1) {
                        return "/index.html";
                    }
                }
            }
        },
        static: [
            {
                directory: path.join(__dirname, "assets"),
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./assets/index.html",
            favicon: "./assets/favicon.ico"
        }),
        new WebpackManifestPlugin()
    ],
    resolve: {
        extensions: [ ".ts", ".tsx", ".js" ]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
        filename: "[name].[contenthash].js",
        chunkFilename: "[name].[contenthash].js",
        assetModuleFilename: "assets/resources/[hash][ext][query]"
    },
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    experiments: {
        topLevelAwait: false
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/i,
                loader: "file-loader",
                options: {
                    outputPath: "assets/images"
                }
            },
            {
                test: /\.mp3$/,
                loader: "file-loader",
                options: {
                    outputPath: "assets/audio"
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[ext]"
                        }
                    }
                ]
            }
        ]
    }
}