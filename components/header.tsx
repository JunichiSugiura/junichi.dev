import { Link } from "components";
import styled from "styled-components";
import { fonts, useTheme } from "logic/styles";
import {
  IoMdSunny,
  IoLogoGithub,
  IoLogoTwitter,
  IoLogoYoutube,
  IoLogoInstagram,
} from "react-icons/io";
import { accounts } from "logic/sns";

export function Header() {
  const { toggleColorScheme } = useTheme();

  return (
    <Container>
      <Link href="/">
        <Logo>Jun<Accent>i</Accent>chi</Logo>
      </Link>

      <Right>
        <a href={accounts.youtube.link} target="_blank">
          <IconContainer>
            <IoLogoYoutube size={28} color="var(--color-youtube-red)" />
          </IconContainer>
        </a>

        <a href={accounts.twitter.link} target="_blank">
          <IconContainer>
            <IoLogoTwitter size={28} color="var(--color-twitter-blue)" />
          </IconContainer>
        </a>

        <a href={accounts.github.link} target="_blank">
          <IconContainer>
            <IoLogoGithub size={28} color="var(--color-grey)" />
          </IconContainer>
        </a>

        <a href={accounts.instagram.link} target="_blank">
          <IconContainer>
            <IoLogoInstagram size={28} color="var(--color-grey)" />
          </IconContainer>
        </a>

        <ToggleContainer onClick={toggleColorScheme}>
          <IconContainer>
            <IoMdSunny size={28} color="var(--color-grey)" />
          </IconContainer>
        </ToggleContainer>
      </Right>
    </Container>
  );
}

const Container = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 6rem;
`;

const Accent = styled.span`
  color: var(--color-primary);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-family: ${fonts.serif};
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  height: 2.25rem;
  width: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem;
`;

const ToggleContainer = styled.div`
  cursor: pointer;
`;
