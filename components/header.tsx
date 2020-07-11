import styled from "styled-components";
import { fonts } from "logic/styles";

export function Header() {
  return (
    <Container>Junichi</Container>
  );
}

const Container = styled.header`
  width: 100vw;
  max-width: 76.25rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  font-size: 1.5rem;
  font-family: ${fonts.serif};
  padding-top: 6rem;
`;
