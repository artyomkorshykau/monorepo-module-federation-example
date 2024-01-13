export interface BuildPath {
    entry: string
    html: string
    output: string
    src: string
    public: string
}

export interface BuildOptions {
    port: number
    paths: BuildPath
    mode: BuildMode
    analyzer?: boolean
    platform: BuildPlatform
}

export type BuildMode = 'production' | 'development'
export type BuildPlatform = 'mobile' | 'desktop'