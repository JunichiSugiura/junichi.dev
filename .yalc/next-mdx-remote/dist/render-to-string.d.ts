import { Options } from '@mdx-js/mdx';
import { Components, Scope } from './types';
export default function renderToString(source: string, components?: Components, options?: Options, scope?: Scope): Promise<{
    source: string | null | undefined;
    renderedOutput: string;
    scope: Scope;
}>;
//# sourceMappingURL=render-to-string.d.ts.map