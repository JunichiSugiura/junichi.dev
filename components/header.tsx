import { Link } from "components";
import {
  IoMdSunny,
  IoLogoGithub,
  IoLogoTwitter,
  IoLogoYoutube,
  IoLogoInstagram,
} from "react-icons/io";
import { accounts } from "logic/sns";
import styled from '@emotion/styled'
import { useCallback } from "react";
import {useTheme, ExactTheme} from "logic/styles"

export function Header() {
  const {theme, setColorMode}= useTheme()

  const toggleColorMode = useCallback(() => {
    setColorMode(mode => mode === 'default' ? 'dark' : 'default')
  }, [])

  return (
      <Container>
        <Link href="/">
          <Logo>Jun<Accent>i</Accent>chi</Logo>
        </Link>

        <Right>
          <a href={accounts.youtube.link} target="_blank">
            <IconContainer>
              <IoLogoYoutube size={28} color={theme.colors.youtubeRed} />
            </IconContainer>
          </a>

          <a href={accounts.twitter.link} target="_blank">
            <IconContainer>
              <IoLogoTwitter size={28} color={theme.colors.twitterBlue} />
            </IconContainer>
          </a>

          <a href={accounts.github.link} target="_blank">
            <IconContainer>
              <IoLogoGithub size={28} color={theme.colors.muted} />
            </IconContainer>
          </a>

          <a href={accounts.instagram.link} target="_blank">
            <IconContainer>
              <IoLogoInstagram size={28} color={theme.colors.muted} />
            </IconContainer>
          </a>

          <ToggleContainer onClick={toggleColorMode}>
            <IconContainer>
              <IoMdSunny size={28} color={theme.colors.muted} />
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

const Accent = styled.span<{ theme: ExactTheme }>`
  color: ${({ theme }) => theme.colors.accent};
`;

const Logo = styled.div<{ theme: ExactTheme }>`
  font-size: 1.5rem;
  font-family: ${({ theme }) => theme.fontFamily.serif};
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
