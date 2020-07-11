import styled from 'styled-components'
import { fonts } from "logic/styles"
import moment from 'moment'

export function Posts({posts}) {
  return (
    <main>
      {posts.map(p => (
        <article key={p.title}>
          <Title>
            {p.title}
          </Title>
          <Date>
            {moment(p.date, 'YYYY-MM-DD').format("YYYY年M月D日")}
          </Date>
          <Spoiler>
            {p.spoiler}
          </Spoiler>
        </article>
      ))}
    </main>
  );
}

const Title = styled.h2`
  font-family: ${fonts.sansSerif};
  font-size: 1.75rem;
  margin-top: 3.5rem
`

const Date = styled.p`
  margin: 1rem 0;
  font-size: 0.75rem;
`

const Spoiler = styled.p`
  margin-bototm: 1.75rem;
`
