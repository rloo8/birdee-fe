import styled from "styled-components";
import { boxStyle, btnStyle } from "../styles/commonStyles";
import MyCalendar from "../Components/MyCalendar";
import { useRecoilState } from "recoil";
import { inviteListState } from "../Components/atoms";

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
  padding: 70px;
  overflow-y: auto;
  height: 100%;
  ${boxStyle}
`;
const PageBox = styled.div`
  border: 3px solid #bac7af;
  margin: 30px;
`;
const PageTitle = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #bac7af;
  padding: 10px 20px;
`;
const PageContent = styled.div`
  padding: 20px;
  font-size: 20px;
`;

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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page, i) => (
          <PageBox key={i}>
            <PageTitle>
              <span className="text-2xl">2020.10.10</span>
              <span className="text-lg">영은</span>
            </PageTitle>
            <PageContent>bla bla~~bla bla~~</PageContent>
          </PageBox>
        ))}
      </PageWrapper>
    </Wrapper>
  );
}
