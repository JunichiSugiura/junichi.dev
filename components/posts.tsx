import Link from "next/link";
import styled from "styled-components";
import moment from "moment";
import { fonts, size, elevation } from "logic/styles";
import { getThumbnailLink } from "logic/sns";

export function Posts({ posts }) {
  return (
    <main>
      {posts.map((p) => (
        <Link href={`/blog/${p.title}`}>
          <Article key={p.title}>
            <Image src={getThumbnailLink("GRL-kF088Y0")} />
            <Data>
              <Title>
                {p.title}
              </Title>
              <Date>
                {moment(p.date, "YYYY-MM-DD").format("YYYY年M月D日")}
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
  cursor: pointer;

  &:hover {
    img {
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

const Title = styled.h2`
  color: var(--color-primary);
  font-family: ${fonts.sansSerif};
  font-size: 1.75rem;
`;

const Date = styled.p`
  margin: 1rem 0;
  font-size: 0.75rem;
`;

const Spoiler = styled.p`
  margin-bototm: 1.75rem;
`;

const Image = styled.img`
  border-radius: ${size.borderRadius};
  box-shadow: ${elevation[4]};

  transition: 0.25s var(--ease-in-out-quad);
`;
