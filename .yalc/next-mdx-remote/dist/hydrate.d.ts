/// <reference types="mdx-js__react" />
import './idle-callback-polyfill';
import React from 'react';
import { MDXProviderProps } from '@mdx-js/react';
import { Components, Scope } from './types';
export default function hydrate({ source, renderedOutput, scope, }: {
    source: string;
    renderedOutput: string;
    scope: Scope;
}, components: Components): React.FunctionComponentElement<MDXProviderProps> | React.ReactElement<{
    dangerouslySetInnerHTML: {
        __html: string;
    };
}, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
//# sourceMappingURL=hydrate.d.ts.map