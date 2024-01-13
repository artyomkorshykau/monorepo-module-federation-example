declare module '*.module.scss' {
    interface IClassNames {
        [classNames: string]: string
    }

    const classNames: IClassNames
    export = classNames
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module "*.svg" {
    import React from "react";
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare const PLATFORM: 'desktop' | 'mobile'