import styled from "styled-components";
import { boxStyle, btnStyle } from "../styles/commonStyles";

// styled components
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const SideWrapper = styled.div``;
const WriteBtn = styled.button`
  ${btnStyle}
`;

const PageWrapper = styled.div`
  margin-top: 40px;
  width: 70%;
  gap: 70px;
  padding: 100px;
  ${boxStyle}
  overflow-y: auto;
  height: 100%;
`;

const PageBox = styled.div`
  border: 3px solid #000;
  margin: 50px;
`;
const PageTitle = styled.div``;
const PageContent = styled.div``;

export default function PageList() {
  return (
    <Wrapper>
      <SideWrapper>
        <h1 className="text-4xl">Diary 1</h1>
        <ul>
          <li>영은</li>
          <li>지수</li>
        </ul>
        <WriteBtn>My turn! 글쓰기</WriteBtn>
      </SideWrapper>
      <PageWrapper>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((page, i) => (
          <PageBox key={i}>
            <PageTitle>2020.10.10</PageTitle>
            <PageContent>bla bla~~bla bla~~</PageContent>
          </PageBox>
        ))}
      </PageWrapper>
    </Wrapper>
  );
}
