import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack, {Configuration} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins({mode, paths, analyzer, platform}: BuildOptions): Configuration['plugins'] {

    const isDev = mode === 'development'
    const isProd = mode === 'production'
    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: paths.html,
            favicon: path.resolve(paths.public, 'favicon.ico'),
            publicPath: '/'
        }),
        new webpack.DefinePlugin({PLATFORM: JSON.stringify(platform)}),
    ]

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin(
            {
                filename: '[name].css',
                chunkFilename: '[name].css'
            }))

        plugins.push(new CopyPlugin({
            patterns: [
                {from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales')},
            ],
        }))
    }

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin())

        // Выносит проверку типов в отдельный процесс, не нагружая сборку.
        // plugins.push(new ForkTsCheckerWebpackPlugin())

        plugins.push(new ReactRefreshWebpackPlugin())
    }

    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin())
    }

    return plugins
}