import styled from "@emotion/styled";
import { ExactTheme } from "src/logic/styles";

export function Profile() {
  return (
    <Container>
      <h2>Junichi Sugiura</h2>
      <p>エンジニア・OSS コントリビュータ</p>
      <p>
        フランス・パリにある
        <a href="https://ledger.com" target="_blank" rel="noreferrer">
          Ledger
        </a>
        という会社で暗号資産用のハードウェアウォレットを作っています。
      </p>
      <p>
        みなさんの暗号資産をできる限り安全に管理できるようにするのが仕事です。
      </p>
    </Container>
  );
}

const Container = styled.div<{ theme: ExactTheme }>`
  margin: 0 0.5rem 2em;

  p {
    margin: 0;
  }

  a {
    text-decoration: underline ${({ theme }) => theme.colors.accent};
    font-weight: bold;
  }
`;
