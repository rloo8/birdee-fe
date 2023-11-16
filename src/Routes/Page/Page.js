import styled from "styled-components";
import { boxStyle, btnStyle } from "../../styles/commonStyles";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

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
  width: 100%;
  ${btnStyle}
`;
const PageWrapper = styled.form`
  width: 70%;
  padding: 30px;
  overflow-y: auto;
  height: 100%;
  ${boxStyle}
`;
const PageTitle = styled.div`
  font-size: 30px;
  border-bottom: 2px solid #4d9cd0;
  padding-bottom: 10px;
  display: flex;
  gap: 10px;
`;

export default function Page() {
  const [pages, setPages] = useState([]);

  const params = useParams();
  console.log(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/diaries/${params.diary_id}/pages/${params.page_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setPages(response.data.data.pages);
      } catch (error) {
        console.error("fetch 오류:", error);
      }
    };

    fetchData();
  }, [params.page_id]);

  return (
    <Wrapper>
      <SideWrapper>
        <span className="text-3xl">Date: 2023.10.10</span>
        <div className="flex gap-5">
          <WriteBtn>수정</WriteBtn>
          <WriteBtn>삭제</WriteBtn>
        </div>
      </SideWrapper>

      <PageWrapper>
        <PageTitle>오늘의 일기</PageTitle>
        <p className="w-[100%] h-[90%] p-5 text-lg focus:outline-none">
          오늘의 일기 오늘의 일기 오늘의 일기 오늘의 일기 오늘의 일기 오늘의
          일기 오늘의 일기 오늘의 일기오늘의 일기오늘의 일기 오늘의 일기 오늘의
          일기 오늘의 일기 오늘의 일기 오늘의 일기오늘의 일기 오늘의 일기 오늘의
          일기 오늘의 일기 오늘의 일기 오늘의 일기 오늘의 일기 오늘의 일기
          오늘의 일기 오늘의 일기 오늘의 일기오늘의 일기오늘의 일기 오늘의 일기
          오늘의 일기 오늘의 일기 오늘의 일기 오늘의 일기오늘의 일기 오늘의 일기
          오늘의 일기 오늘의 일기 오늘의 일기 오늘의 일기 오늘의 일기 오늘의
          일기 오늘의 일기 오늘의 일기 오늘의 일기오늘의 일기오늘의 일기 오늘의
          일기 오늘의 일기 오늘의 일기 오늘의 일기 오늘의 일기오늘의 일기 오늘의
          일기 오늘의 일기 오늘의 일기 오늘의 일기 오늘의 일기 오늘의 일기
          오늘의 일기 오늘의 일기 오늘의 일기 오늘의 일기오늘의 일기오늘의 일기
          오늘의 일기 오늘의 일기 오늘의 일기 오늘의 일기 오늘의 일기오늘의 일기
        </p>
      </PageWrapper>
    </Wrapper>
  );
}
