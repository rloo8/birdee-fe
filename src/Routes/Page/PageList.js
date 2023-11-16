import styled from "styled-components";
import { boxStyle, btnStyle } from "../../styles/commonStyles";
import MyCalendar from "../../Components/MyCalendar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
  width: 100%;
  ${btnStyle}
`;

const PageWrapper = styled.div`
  margin-top: 40px;
  width: 70%;
  padding: 30px;
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
  const [diary, setDiary] = useState({});
  const [pages, setPages] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/diaries/${params.diary_id}/pages`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setDiary(response.data.data);
        setPages(response.data.data.pages || []);
      } catch (error) {
        console.error("fetch 오류:", error);
      }
    };

    fetchData();
  }, [params.diary_id]);
  console.log(diary);

  return (
    <Wrapper>
      <SideWrapper>
        <div className="flex flex-col gap-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>

          <h1 className="text-5xl">{diary.title}</h1>
          <ul className="text-xl">
            {diary?.users?.map((user, i) => (
              <li key={i}>{user}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <Link to={`/diaries/${params.diary_id}/pages/create`}>
            <WriteBtn>My turn! 글쓰기</WriteBtn>
          </Link>
          <MyCalendar />
        </div>
      </SideWrapper>

      <PageWrapper>
        {pages?.map((page) => (
          <Link
            to={`/diaries/${params.diary_id}/pages/${page.page_id}`}
            key={page.page_id}
          >
            <PageBox>
              <PageTitle>
                <div>
                  <span className="text-2xl">{page.subject}</span>
                  <span className="text-xl"> (2020.10.10)</span>
                </div>
                <span className="text-xl">{page.name}</span>
              </PageTitle>
              <PageContent>{page.contents}</PageContent>
            </PageBox>
          </Link>
        ))}
      </PageWrapper>
    </Wrapper>
  );
}
