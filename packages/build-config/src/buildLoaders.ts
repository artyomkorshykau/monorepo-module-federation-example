import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import {BuildOptions} from "./types/types";
import {buildBabelLoader} from "./babel/buildBabelLoader";
import {removeDataTestIdBabelPlugin} from "./babel/removeDataTestIdBabelPlugin";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {

    const isDev = options.mode === 'development'

    const scssLoaderWithModule = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
            },
        },
    }
    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            scssLoaderWithModule,
            "sass-loader",
        ],
    }
    const assetsLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
    }
    const svgLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [{
            loader: '@svgr/webpack',
            options: {
                icon: true,
                svgoConfig: [
                    {
                        name: 'convertColors',
                        params: {
                            currentColors: true
                        }
                    }
                ]
            }
        }],
    }
    const tsLoader = {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{
            loader: 'ts-loader',
            options: {
                transpileOnly: isDev,
                getCustomTransformers: () => ({
                    before: [isDev && ReactRefreshTypeScript()].filter(Boolean)
                })
            }
        }
        ]
    }
    // const babelLoader = buildBabelLoader(options)

    return [
        assetsLoader,
        scssLoader,
        tsLoader,
        // babelLoader,
        svgLoader
    ]
}