import { Link } from "src/components";
import {
  IoMdSunny,
  IoLogoGithub,
  IoLogoTwitter,
  IoLogoYoutube,
  IoLogoInstagram,
} from "react-icons/io";
import { accounts } from "src/logic/sns";
import styled from '@emotion/styled'
import { useCallback } from "react";
import {useTheme, ExactTheme} from "src/logic/styles"

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
        <a href={accounts.youtube.link} target="_blank" rel="noreferrer">
          <IconContainer>
            <IoLogoYoutube size={28} color={theme.colors.youtubeRed} />
          </IconContainer>
        </a>

        <a href={accounts.twitter.link} target="_blank"  rel="noreferrer">
          <IconContainer>
            <IoLogoTwitter size={28} color={theme.colors.twitterBlue} />
          </IconContainer>
        </a>

        <a href={accounts.github.link} target="_blank"  rel="noreferrer">
          <IconContainer>
            <IoLogoGithub size={28} color={theme.colors.muted} />
          </IconContainer>
        </a>

        <a href={accounts.instagram.link} target="_blank"  rel="noreferrer">
          <IconContainer>
            <IoLogoInstagram size={28} color={theme.colors.muted} />
          </IconContainer>
        </a>

        <button onClick={toggleColorMode}>
          <IconContainer>
            <IoMdSunny size={28} color={theme.colors.muted} />
          </IconContainer>
        </button>
      </Right>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1rem;
`;

const Accent = styled.span<{ theme: ExactTheme }>`
  color: ${({ theme }) => theme.colors.accent};
`;

const Logo = styled.div<{ theme: ExactTheme }>`
  font-size: 1.125rem;
  font-family: ${({ theme }) => theme.fontFamily.serif};
  letter-spacing: 0.2em;
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
  margin: 0 0.25rem;
`;
