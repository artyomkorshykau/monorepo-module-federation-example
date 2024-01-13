import {buildWebpack, BuildPath, BuildPlatform, BuildMode} from '@packages/build-config'
import * as path from "path";
import packageJson from './package.json'
import webpack from "webpack";

interface EnvVariables {
    mode?: BuildMode
    port?: number
    analyzer?: boolean
    platform?: BuildPlatform
}

export default (env: EnvVariables) => {

    const paths: BuildPath = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'shop.ts'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        public: path.resolve(__dirname, 'public'),
        src: path.resolve(__dirname, 'src')
    }

    const config: webpack.Configuration = buildWebpack(
        {
            port: env.port ?? 3001,
            mode: env.mode ?? 'development',
            paths: paths,
            analyzer: env.analyzer,
            platform: env.platform ?? 'desktop'
        }
    )

    config.plugins.push(new webpack.container.ModuleFederationPlugin({

        name: 'shop',
        filename: 'remoteEntry.js',
        exposes: {'./Router': './src/router/Router.tsx'},
        shared: {
            ...packageJson.dependencies,
            'react': {
                eager: true,
                requiredVersion: packageJson.dependencies['react'],
            },
            'react-router-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-router-dom'],
            },
            'react-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-dom'],
            },
        }
    }))

    return config

}
