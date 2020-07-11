import styled from "styled-components";
import { fonts, useTheme } from "logic/styles";
import {IoMdSunny, IoLogoGithub, IoLogoTwitter} from 'react-icons/io'

export function Header() {
  const { toggleColorScheme } = useTheme();

  return (
    <Container>
      <Logo>Junichi</Logo>

      <Right>
        <div onClick={toggleColorScheme}>
          <IoMdSunny size={28} />
        </div>
      </Right>
    </Container>
  );
}

const Container = styled.header`
  width: 100vw;
  max-width: 40rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  padding-top: 6rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-family: ${fonts.serif};
`;

const Right = styled.div``;
