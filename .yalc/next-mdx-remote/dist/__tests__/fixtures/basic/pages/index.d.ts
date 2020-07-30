export default function TestPage({ data, mdxSource }: {
    data: any;
    mdxSource: any;
}): JSX.Element;
export function getStaticProps(): Promise<{
    props: {
        mdxSource: {
            source: string | null | undefined;
            renderedOutput: string;
            scope: import("../../../../types").Scope;
        };
        data: {
            [key: string]: any;
        };
    };
}>;
//# sourceMappingURL=index.d.ts.map