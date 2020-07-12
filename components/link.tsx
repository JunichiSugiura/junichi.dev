import RawLink from "next/link";
import styled from "styled-components";

export function Link(props: RawLink["props"]) {
  return (
    <Container>
      <RawLink {...props} />
    </Container>
  );
}

const Container = styled.div`
  cursor: pointer;
`;
