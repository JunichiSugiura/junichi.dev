import Highlight, { defaultProps, Language } from "prism-react-renderer";
import highlightTheme from "prism-react-renderer/themes/nightOwl";
import styled from "@emotion/styled";
import { theme } from "src/logic/styles";

// TODO: line highlight
export function Code({
  codeString,
  language,
  highlights,
}: {
  codeString: string;
  language: Language;
  highlights: number[];
}) {
  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={highlightTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => {
            const isHighlighted = highlights.includes(i);
            return (
              <Line
                key={i}
                {...getLineProps({ line, key: i })}
                isHighlighted={isHighlighted}
              >
                <HighlightedLineIndicator isHighlighted={isHighlighted} />
                <LineContent>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
              </Line>
            );
          })}
        </Pre>
      )}
    </Highlight>
  );
}

const Pre = styled.pre`
  padding: 1rem;
  width: 100vw;
  overflow: auto;

  @media screen and (min-width: ${theme.breakpoints[0]}) {
    width: 100%;
    border-radius: ${theme.borderRadius};
  }
`;

const Line = styled.div<{ isHighlighted: boolean }>`
  display: table-row;
`;

const HighlightedLineIndicator = styled.span<{ isHighlighted: boolean }>`
  display: table-cell;
`;

const LineContent = styled.span`
  font-size: 1rem;
  display: table-cell;
`;
