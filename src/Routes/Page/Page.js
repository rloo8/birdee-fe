import styled from "styled-components";
import { boxStyle, btnStyle } from "../../styles/commonStyles";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { HOST_URL } from "../../App";

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${HOST_URL}/diaries/${params.diary_id}/pages/${params.page_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPages(response.data.page);
      } catch (error) {
        console.error("fetch 오류:", error);
      }
    };

    fetchData();
  }, [params.page_id]);

  return (
    <Wrapper>
      <SideWrapper>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 cursor-pointer mb-3"
            onClick={() => navigate(`/diaries/${params.diary_id}/pages`)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <span className="text-3xl">
            Date:{" "}
            {moment(pages.createdAt).format("YYYY.MM.DD ddd").toUpperCase()}
          </span>
        </div>

        <div className="flex gap-5">
          <WriteBtn>수정</WriteBtn>
          <WriteBtn>삭제</WriteBtn>
        </div>
      </SideWrapper>

      <PageWrapper>
        <PageTitle>{pages.subject}</PageTitle>
        <p className="w-[100%] h-[90%] p-5 text-lg focus:outline-none">
          {pages.contents}
        </p>
      </PageWrapper>
    </Wrapper>
  );
}
