import { Link } from "components";
import styled from "@emotion/styled";
import moment from "moment";
import { elevation, ExactTheme } from "logic/styles";
import { getThumbnailLink } from "logic/sns";

export function Posts({ posts }) {
  return (
    <main>
      {posts.map((p) => (
        <Link key={p.title} href={`/blog/${p.title}`}>
          <Article>
            <Image src={getThumbnailLink(p.videoId)} />
            <Data>
              <Title>
                {p.title}
              </Title>
              <Date>
                {moment(p.date).format("YYYY年M月D日")}
              </Date>
              <Spoiler>
                {p.spoiler}
              </Spoiler>
            </Data>
          </Article>
        </Link>
      ))}
    </main>
  );
}

const Article = styled.article`
  margin-top: 3.5rem;
  display: flex;
  align-items: center;

  &:hover {
    > div:first-child {
      box-shadow: ${elevation[3]};
      transform: translateY(-0.1rem);
    }
  }
`;

const Data = styled.div`
  margin-left: 1.75rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2<{ theme: ExactTheme }>`
  text-decoration: underline ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.fontFamily.sansSerif};
  font-size: 1.75rem;
`;

const Date = styled.p`
  margin: 1rem 0;
  font-size: 0.75rem;
`;

const Spoiler = styled.p`
  margin-bototm: 1.75rem;
`;

const Image = styled.div<{ src: string, theme: ExactTheme }>`
  min-width: 320px;
  min-height: 180px;
  background: center / cover no-repeat url(${(props) => props.src});
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${elevation[4]};

  transition: 0.25s var(--ease-in-out-quad);
`;
