import { Link } from "src/components";
import styled from "@emotion/styled";
import moment from "moment";
import { elevation, ExactTheme } from "src/logic/styles";
import { PostData } from "src/logic/models";
import { getThumbnailLink } from "src/logic/sns";

export function Posts({ posts }: { posts: PostData[] }) {
  return (
    <main>
      {posts.map((p) => (
        <Link key={p.title} href={`/blog/${p.title}`}>
          <Article>
            <Image src={getThumbnailLink(p.videoId)} />
            <Data>
              <Title>{p.title}</Title>
              <Date>{moment(p.date).format("YYYY年M月D日")}</Date>
              <Spoiler>{p.spoiler}</Spoiler>
            </Data>
          </Article>
        </Link>
      ))}
    </main>
  );
}

const Article = styled.article`
  margin: 2rem 1rem;
  display: flex;
  align-items: stretch;
  flex-direction: column;

  &:hover {
    > div:first-of-type {
      box-shadow: ${elevation[3]};
      transform: translateY(-0.1rem);
    }
  }
`;

const Data = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2<{ theme: ExactTheme }>`
  text-decoration: underline ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.fontFamily.sansSerif};
  font-size: 1.75rem;
  margin: 1rem 0;
`;

const Date = styled.p<{ theme: ExactTheme }>`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted}
`;

const Spoiler = styled.p`
  margin-bototm: 1.75rem;
  margin 1rem 0;
`;

const Image = styled.div<{ src: string; theme: ExactTheme }>`
  align-self: center;
  display: flex;
  width: 100%;
  height: calc((100vw - 2rem) / 16 * 9);
  background: center / cover no-repeat url(${(props) => props.src});
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${elevation[4]};

  transition: 0.25s var(--ease-in-out-quad);
`;
