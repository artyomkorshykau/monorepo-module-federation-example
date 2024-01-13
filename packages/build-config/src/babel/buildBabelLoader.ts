import {BuildOptions} from "../types/types";
import {removeDataTestIdBabelPlugin} from "./removeDataTestIdBabelPlugin";

export function buildBabelLoader({mode}: BuildOptions) {

    const plugins = []

    const isDev = mode === 'development'
    const isProd = mode === 'production'

    if (isProd) {
        plugins.push([
            removeDataTestIdBabelPlugin, {props: ['data-test-id']}
        ])
    }

    return {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-typescript",
                    ["@babel/preset-react",
                        {
                            runtime: isDev ? "automatic" : 'classic'
                        }
                    ]
                ],
                plugins: plugins.length ? plugins : undefined
            }
        }
    }
}