import { Code } from "./code";

export function Pre(preProps) {
  const props = preToCodeBlock(preProps);
  return props ? <Code {...props} /> : <pre {...preProps} />;
}

function preToCodeBlock({ children }) {
  if (children?.props?.mdxType === "code") {
    const { children: codeString, className, ...props } = children.props;

    const postfix = className.replace(/language-/, "");
    const [language, highlightsString] = postfix.split(/{([^}]*)}/);
    const highlights = highlightsString?.split(",").map(parseInt) ?? [];
    return {
      codeString: codeString.trim(),
      language,
      highlights,
      ...props,
    };
  }
}
