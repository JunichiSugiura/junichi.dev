import { Link } from "src/components";
import styled from "@emotion/styled";
import moment from "moment";
import { elevation, ExactTheme } from "src/logic/styles";
import { PostData } from "src/logic/models";
import { getThumbnailLink } from "src/logic/sns";

export function Posts({ posts }: { posts: PostData[] }) {
  return (
    <Container>
      <Header>新着記事</Header>
      {posts.map((p) => (
        <Link key={p.title} href={`/blog/${p.slug}`}>
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
    </Container>
  );
}

const pageVerticalPadding = "2rem";

const Container = styled.div`
  padding: 0 ${pageVerticalPadding};
`;

const Header = styled.h2`
  font-size: 0.875rem;
  margin: 0 1rem;
  display: flex;
  justify-content: center;
`;

const Article = styled.article<{ theme: ExactTheme }>`
  margin: 2rem 0;
  display: flex;
  align-items: stretch;
  flex-direction: column;

  &:hover {
    > div:first-of-type {
      box-shadow: ${elevation[3]};
      transform: translateY(-0.1rem);
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    flex-direction: row;
  }
`;

const Data = styled.div<{ theme: ExactTheme }>`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    flex: 2;
  }
`;

const Title = styled.h3<{ theme: ExactTheme }>`
  text-decoration: underline ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.fontFamily.sansSerif};
  font-size: 1.75rem;
  margin: 1rem 0;
`;

const Date = styled.p<{ theme: ExactTheme }>`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
`;

const Spoiler = styled.p`
  margin-bototm: 1.75rem;
  margin 1rem 0;
`;

const imageMarginRight = "1rem";

const videoAspectRatio = 9 / 16;

const Image = styled.div<{ src: string; theme: ExactTheme }>`
  align-self: center;
  display: flex;
  width: 100%;
  height: calc((100vw - 2rem) / 16 * 9);
  background: center / cover no-repeat url(${(props) => props.src});
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${elevation[4]};

  transition: 0.25s var(--ease-in-out-quad);

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    margin-right: ${imageMarginRight};
    flex: 1;
    height: calc(
      ((100vw - ${pageVerticalPadding} * 2 - ${imageMarginRight}) / 3) *
        ${videoAspectRatio}
    );
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    height: calc(
      (
          (
              ${({ theme }) => theme.breakpoints[1]} - ${pageVerticalPadding} *
                2 - ${imageMarginRight}
            ) / 3
        ) * ${videoAspectRatio}
    );
  }
`;
