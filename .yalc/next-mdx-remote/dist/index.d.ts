/// <reference types="react" />
declare module "babel-plugin-mdx-browser" {
    function _exports(): {
        visitor: {
            ImportDeclaration(path: any): void;
            VariableDeclaration(path: any): void;
        };
    };
    export = _exports;
}
declare module "types" {
    import { createElement } from 'react';
    export interface Scope {
    }
    export type Components = Parameters<typeof createElement>;
}
declare module "hydrate" {
    import './idle-callback-polyfill';
    import React from 'react';
    import { Components, Scope } from "types";
    export default function hydrate({ source, renderedOutput, scope }: {
        source: string;
        renderedOutput: string;
        scope: Scope;
    }, components: Components): React.DetailedReactHTMLElement<{
        dangerouslySetInnerHTML: {
            __html: string;
        };
    }, HTMLElement>;
}
declare module "render-to-string" {
    import { Options } from '@mdx-js/mdx';
    import { Components, Scope } from "types";
    export default function renderToString(source: string, components?: Components, options?: Options, scope?: Scope): Promise<{
        source: string | null | undefined;
        renderedOutput: string;
        scope: Scope;
    }>;
}
declare module "__tests__/index" {
    export {};
}
declare module "__tests__/fixtures/basic/components/test" {
    export default function Test({ name }: {
        name: any;
    }): JSX.Element;
}
declare module "__tests__/fixtures/basic/pages/index" {
    export default function TestPage({ data, mdxSource }: {
        data: any;
        mdxSource: any;
    }): JSX.Element;
    export function getStaticProps(): Promise<{
        props: {
            mdxSource: {
                source: string | null | undefined;
                renderedOutput: string;
                scope: import("types").Scope;
            };
            data: any;
        };
    }>;
}
//# sourceMappingURL=index.d.ts.map