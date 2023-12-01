import styled from "styled-components";
import { boxStyle, btnStyle, modalBoxStyle } from "../../styles/commonStyles";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { HOST_URL } from "../../App";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TooltipButton from "../../Components/TooltipButton";

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
  font-size: 24px;
  border-bottom: 2px solid #4d9cd0;
  padding-bottom: 10px;
  display: flex;
  gap: 10px;
`;

const ModalBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 600px;
  height: 280px;
  padding: 25px;
  ${modalBoxStyle}

  span {
    font-size: 20px;
  }
  .btnBox {
    display: flex;
    justify-content: space-between;
    gap: 50px;
    width: 70%;
  }
  button {
    width: 100%;
    ${btnStyle}
  }
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

// frame-motion variants
const modalVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
    x: "-50%",
    y: "-50%",
  },
  end: {
    opacity: 1,
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export default function Page() {
  // 로딩 state
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState([]);
  const [diary, setDiary] = useState([]);
  const [user, setUser] = useState({});

  const [showModal, setShowModal] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // user 정보 조회
        const userResponse = await axios.get(`${HOST_URL}/auth/member`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUser(userResponse.data.data);

        // page api 호출
        const pageResponse = await axios.get(
          `${HOST_URL}/diaries/${params.diary_id}/pages/${params.page_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPage(pageResponse.data.page);

        // diary api 호출 (수정, 삭제 가능 여부)
        const diaryResponse = await axios.get(
          `${HOST_URL}/diaries/${params.diary_id}/pages`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDiary(diaryResponse.data.data);

        setIsLoading(false);
      } catch (error) {
        console.error("fetch 오류:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.page_id]);

  // 페이지 수정or삭제 가능한 일기장인지 여부
  const is_deletable = diary.is_deletable;
  const is_editable = diary.is_editable;

  // 페이지 삭제 함수
  const handleDeleteClick = async () => {
    try {
      await axios.put(
        `${HOST_URL}/diaries/${params.diary_id}/pages/${params.page_id}`,
        { deleted: true },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("삭제 성공");
      navigate(`/diaries/${params.diary_id}/pages`);
    } catch (error) {
      console.error("페이지 삭제 중 오류 발생: ", error);
    }
  };

  return (
    <Wrapper>
      <SideWrapper>
        <div className="flex flex-col gap-3">
          <TooltipButton
            text="일기장"
            btnType="solid"
            onClick={() => navigate(`/diaries/${params.diary_id}/pages`)}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 25 25"
                strokeWidth="2"
                stroke="#fff"
                className="w-6 h-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            }
            left="22%"
          />
          <span className="text-2xl">
            Date:{" "}
            {moment(page.createdAt).format("YYYY.MM.DD ddd").toUpperCase()}
          </span>
        </div>

        {!isLoading && user.name === page.User.name && (
          <div className="flex gap-5">
            {diary.deleted === "undeleted" && is_editable && (
              <Link to="edit" className="w-full">
                <WriteBtn>수정</WriteBtn>
              </Link>
            )}
            {diary.deleted === "undeleted" && is_deletable && (
              <a className="w-full">
                <WriteBtn onClick={() => setShowModal(true)}>삭제</WriteBtn>
              </a>
            )}
          </div>
        )}
      </SideWrapper>

      <PageWrapper>
        <PageTitle>{page.subject}</PageTitle>
        <p className="w-[100%] h-[90%] p-5 text-md focus:outline-none">
          {page.contents}
        </p>
      </PageWrapper>

      {showModal && (
        <>
          <ModalBox variants={modalVariants} initial="start" animate="end">
            <h3>alert</h3>
            <span className="text-center">
              일기를 삭제하시겠습니까?
              <br />
              삭제한 일기는 복구할 수 없습니다.
            </span>
            <div className="btnBox">
              <button onClick={handleDeleteClick}>예</button>
              <button onClick={() => setShowModal(false)}>아니오</button>
            </div>
          </ModalBox>
          <Overlay />
        </>
      )}
    </Wrapper>
  );
}
