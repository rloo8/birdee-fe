import styled from "styled-components";
import { boxStyle, btnStyle, solidBtnStyle } from "../../styles/commonStyles";
import MyCalendar from "../../Components/MyCalendar";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { HOST_URL } from "../../App";

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
const SolidBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  ${solidBtnStyle}
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${HOST_URL}/diaries/${params.diary_id}/pages`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setDiary(response.data.data);
        setPages(response.data.data.pages);

        console.log(response.data.data);
      } catch (error) {
        console.error("fetch 오류:", error);
      }
    };

    fetchData();
  }, [params.diary_id]);

  return (
    <Wrapper>
      <SideWrapper>
        <div className="flex flex-col gap-5">
          <Link to="/">
            <SolidBtn>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#fff"
                className="w-7 h-7"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            </SolidBtn>
          </Link>

          <h1 className="text-5xl">{diary.title}</h1>
          <ul className="text-xl">
            {diary?.users?.map((user, i) => (
              <li key={i} className="pl-2">
                {user}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          {diary.deleted !== "undeleted" ? null : (
            <Link to={`create`}>
              <WriteBtn>My turn! 글쓰기</WriteBtn>
            </Link>
          )}
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
                  <span className="text-2xl">{page.subject} </span>
                  <span className="text-xl">
                    ({moment(page.created_at).format("YYYY.MM.DD")})
                  </span>
                </div>
                <span className="text-xl">{page.name}</span>
              </PageTitle>
              <PageContent>
                {page.contents.length > 150
                  ? `${page.contents.slice(0, 150)}...`
                  : page.contents}
              </PageContent>
            </PageBox>
          </Link>
        ))}
      </PageWrapper>
    </Wrapper>
  );
}
