import styled from "styled-components";
import { activeBtnStyle, boxStyle, btnStyle } from "../../styles/commonStyles";
import MyCalendar from "../../Components/MyCalendar";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { HOST_URL } from "../../App";
import TooltipButton from "../../Components/TooltipButton";
import { motion } from "framer-motion";

// styled components
const Wrapper = styled.div`
  display: flex;
  gap: 50px;
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
  padding-top: 60px;
`;

const WriteBtn = styled.button`
  width: 100%;
  ${btnStyle}
  &:active {
    ${activeBtnStyle}
  }
`;

const PageWrapper = styled.div`
  margin-top: 40px;
  width: 1000px;
  padding: 30px;
  overflow-y: auto;
  height: 100%;
  ${boxStyle}
`;
const PageBox = styled.div`
  margin: 30px;
`;
const PageTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
`;
const PageContent = styled.div`
  padding: 20px;
  font-size: 17px;
`;

const ProfileBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  position: absolute;
  left: 90px;
  background-color: #fff;
  color: #333;
  font-size: 13px;
  padding: 15px 25px 10px;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.1);

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    border: 15px solid transparent;
    border-right-color: #fff;
    border-left: 0;
    border-top: 0;
    margin-top: 12px;
    margin-left: -13px;
  }
`;

export default function PageList() {
  const [diary, setDiary] = useState({});
  const [pages, setPages] = useState([]);

  // 유저 정보 state
  const [user, setUser] = useState({});

  // 프로필 정보창
  const [showProfile, setShowProfile] = useState(false);
  const [clickedUserIndex, setClickedUserIndex] = useState(null);

  // 선택한 날짜의 페이지 id state
  const [selectedPageId, setSelectedPageId] = useState(null);

  const params = useParams();

  // 다이어리 정보 조회
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
      } catch (error) {
        console.error("fetch 오류:", error);
      }
    };

    fetchData();
  }, [params.diary_id]);

  // 내 정보 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${HOST_URL}/auth/member`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data.data);
      } catch (error) {
        console.error("fetch 오류:", error);
      }
    };

    fetchData();
  }, []);

  // 유저 클릭 시 프로필 조회
  const handleShowProfile = (event) => {
    const index = parseInt(event.target.getAttribute("data-index"));

    setClickedUserIndex(index);
    setShowProfile(true);
  };

  // 선택한 날짜로 페이지 스크롤링
  useEffect(() => {
    if (selectedPageId !== null) {
      const selectedPageElement = document.getElementById(
        `page-${selectedPageId}`
      );

      if (selectedPageElement) {
        selectedPageElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [selectedPageId]);

  // 글쓰기 활성화 유저
  const activeUserIndex = diary?.pages?.length % diary?.users?.length;

  // 컬러 배열
  const colors = ["#E4DBA4", "#BAC7AF", "#EACFCB", "#AACAD1"];

  // 오늘 날짜 정보
  const date = new Date();
  const today = moment(date).format("YYYY-MM-DD");

  return (
    <Wrapper>
      <div className="absolute">
        <Link to="/">
          <TooltipButton
            text="홈"
            btnType="solid"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#fff"
                className="w-6 h-6"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            }
          />
        </Link>
      </div>
      <SideWrapper>
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl">{diary.title}</h1>
          <ul className="text-xl">
            {diary?.users?.map((user, index) => (
              <li key={index} className="pl-1 flex relative">
                <span
                  data-index={index}
                  onClick={handleShowProfile}
                  className={user.status === "pending" ? "text-gray-400" : null}
                >
                  {user.name}
                </span>
                {index === activeUserIndex && user.status === "accept" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#000"
                    className="w-8 h-8"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                  </svg>
                ) : null}
                {showProfile && index === clickedUserIndex && (
                  <ProfileBox
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 10 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    {user.image !== null && (
                      <img src={user.image} alt={user.name} className="w-20" />
                    )}
                    <span>{user.message}</span>
                    <svg
                      onClick={() => {
                        setShowProfile(false);
                      }}
                      width="17px"
                      height="17px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      color="#333333"
                      strokeWidth="1.5"
                      className="absolute top-1 right-1 cursor-pointer"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9.70164 8.64124C9.40875 8.34835 8.93388 8.34835 8.64098 8.64124C8.34809 8.93414 8.34809 9.40901 8.64098 9.7019L10.9391 12L8.64098 14.2981C8.34809 14.591 8.34809 15.0659 8.64098 15.3588C8.93388 15.6517 9.40875 15.6517 9.70164 15.3588L11.9997 13.0607L14.2978 15.3588C14.5907 15.6517 15.0656 15.6517 15.3585 15.3588C15.6514 15.0659 15.6514 14.591 15.3585 14.2981L13.0604 12L15.3585 9.7019C15.6514 9.40901 15.6514 8.93414 15.3585 8.64124C15.0656 8.34835 14.5907 8.34835 14.2978 8.64124L11.9997 10.9393L9.70164 8.64124Z"
                        fill="#333"
                      ></path>
                    </svg>
                  </ProfileBox>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          {diary.deleted === "undeleted" &&
            (pages[0]?.created_at === undefined ||
              moment(pages[0]?.created_at).format("YYYY-MM-DD") !== today) && (
              <Link to={`create`}>
                <WriteBtn
                  style={{
                    display:
                      user.name === diary.users[activeUserIndex].name
                        ? "inline-block"
                        : "none",
                  }}
                >
                  My turn! 글쓰기
                </WriteBtn>
              </Link>
            )}
          <MyCalendar
            diary={diary}
            pages={pages}
            colors={colors}
            setSelectedPageId={setSelectedPageId}
          />
        </div>
      </SideWrapper>

      <PageWrapper>
        {pages
          ?.filter((page) => !page.deleted)
          .map((page) => {
            const userIndex = diary.users.findIndex(
              (user) => user.user_id === page.user_id
            );
            const boxColor = colors[userIndex];

            return (
              <Link
                to={`/diaries/${params.diary_id}/pages/${page.page_id}`}
                key={page.page_id}
              >
                <PageBox
                  id={`page-${page.page_id}`}
                  style={{ border: `3px solid ${boxColor}` }}
                >
                  <PageTitle style={{ backgroundColor: boxColor }}>
                    <div>
                      <span className="text-xl">{page.subject} </span>
                      <span className="text-md">
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
            );
          })}
      </PageWrapper>
    </Wrapper>
  );
}
