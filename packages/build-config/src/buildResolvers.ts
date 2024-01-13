import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import {Configuration} from "webpack";
import {BuildOptions} from "./types/types";

export function buildResolvers(options: BuildOptions): Configuration['resolve'] {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@' : options.paths.src,
        }
    }
}