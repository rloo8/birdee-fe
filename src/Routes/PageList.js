import styled from "styled-components";
import { boxStyle, btnStyle } from "../styles/commonStyles";
import MyCalendar from "../Components/MyCalendar";

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
const SideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
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
        <div className="flex flex-col gap-5">
          <h1 className="text-5xl">Diary 1</h1>
          <ul className="text-xl">
            <li>영은</li>
            <li>지수</li>
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <WriteBtn>My turn! 글쓰기</WriteBtn>
          <MyCalendar />
        </div>
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
