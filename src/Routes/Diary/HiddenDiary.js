import styled from "styled-components";
import {
  boxStyle,
  btnStyle,
  modalBoxStyle,
  solidBtnStyle,
  stokeBtnStyle,
} from "../../styles/commonStyles";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { HOST_URL } from "../../App";
import TooltipButton from "../../Components/TooltipButton";
import { motion } from "framer-motion";

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
const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ContentBox = styled.div`
  width: 80%;
`;

// 일기장 컴포넌트
const DiaryBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 50px;
  padding: 80px;
  ${boxStyle}
  overflow-y: auto;
  height: 100%;
`;
const Diary = styled.div`
  position: relative;
  width: 160px;
  height: 180px;
`;
const DiaryTitle = styled.h3`
  font-size: 18px;
  text-align: center;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 57%;
  transform: translate(-50%, -50%);
`;
const DiaryCover = styled.img`
  width: 100%;
`;
const DiaryBtn = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  position: absolute;
  top: -15px;
  right: -15px;
  background-color: #e84118;
  border-radius: 50%;
`;

// 모달창 컴포넌트
const ModalBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 600px;
  height: 300px;
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
const btnVariants = {
  start: {
    scale: 0,
  },
  end: {
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.5,
      duration: 1,
    },
  },
  exit: {
    scale: 0,
  },
};
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

export default function HiddenDiary() {
  const [hiddenDiaries, setHiddenDiaries] = useState([]);

  const [showBtn, setShowBtn] = useState(null);
  const [selectedDiaryId, setSelectedDiaryId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 숨김해제, 삭제 버튼 클릭 시
  const onBtnClick = (mode) => {
    if (showBtn === mode) {
      setShowBtn(null);
    } else {
      setShowBtn(mode);
    }
  };
  const handleYesClick = async () => {
    try {
      if (showBtn === "notHidden") {
        await axios.put(
          `${HOST_URL}/diaries/${selectedDiaryId}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("숨김 해제 성공");
      }
      if (showBtn === "delete") {
        await axios.delete(
          `${HOST_URL}/diaries/${selectedDiaryId}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("삭제 성공");
      }
    } catch (error) {
      console.error("일기장 숨김 삭제 중 오류 발생:", error);
    } finally {
      setShowModal(false);
      setShowBtn(null);
      setSelectedDiaryId(null);
    }
  };

  // 숨긴 일기장 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${HOST_URL}/auth/member`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setHiddenDiaries(response.data.data.hiddenDiaries);
      } catch (error) {
        console.error("fetch 오류:", error);
      }
    };

    fetchData();
  }, [showModal]);

  return (
    <Wrapper>
      <BtnWrapper>
        <Link to="/mypage">
          <TooltipButton
            text="마이페이지"
            btnType="solid"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#fff"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            }
            left="100%"
          />
        </Link>
        <TooltipButton
          text="숨김해제"
          onClick={() => onBtnClick("notHidden")}
          btnType="stroke"
          icon={
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#4d9cd0"
              strokeWidth="2"
            >
              <path
                d="M3 13C6.6 5 17.4 5 21 13"
                stroke="#4d9cd0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M12 17C10.3431 17 9 15.6569 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14C15 15.6569 13.6569 17 12 17Z"
                fill="#4d9cd0"
                stroke="#4d9cd0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          }
          left="100%"
        />
        <TooltipButton
          text="삭제"
          onClick={() => onBtnClick("delete")}
          btnType="stroke"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#4d9cd0"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                clipRule="evenodd"
              />
            </svg>
          }
          left="100%"
        />
      </BtnWrapper>

      <ContentBox>
        <h1 className="text-3xl pb-[20px]">숨긴 일기장</h1>
        <DiaryBox>
          {hiddenDiaries?.map((diary) => (
            <Diary key={diary.id}>
              {showBtn === "notHidden" ? (
                <DiaryBtn
                  variants={btnVariants}
                  initial="start"
                  animate="end"
                  exit="exit"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setSelectedDiaryId(diary.id);
                    setShowModal(true);
                  }}
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="#fff"
                    strokeWidth="2"
                  >
                    <path
                      d="M3 13C6.6 5 17.4 5 21 13"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M12 17C10.3431 17 9 15.6569 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14C15 15.6569 13.6569 17 12 17Z"
                      fill="#fff"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </DiaryBtn>
              ) : null}
              {showBtn === "delete" ? (
                <DiaryBtn
                  variants={btnVariants}
                  initial="start"
                  animate="end"
                  exit="exit"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setSelectedDiaryId(diary.id);
                    setShowModal(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#fff"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </DiaryBtn>
              ) : null}
              <DiaryTitle>{diary.title}</DiaryTitle>
              <Link to={`/diaries/${diary.id}/pages`}>
                <DiaryCover
                  src={`/image/${diary.color}.png`}
                  alt={diary.title}
                />
              </Link>
            </Diary>
          ))}
        </DiaryBox>
      </ContentBox>

      {showModal ? (
        <>
          <ModalBox variants={modalVariants} initial="start" animate="end">
            <h3>alert</h3>
            <span>
              {showBtn === "notHidden"
                ? "일기장을 숨김 해제 하시겠습니까?"
                : showBtn === "delete"
                ? "일기장을 삭제하시겠습니까?"
                : null}
            </span>
            <div className="btnBox">
              <button onClick={handleYesClick}>예</button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedDiaryId(null);
                }}
              >
                아니오
              </button>
            </div>
          </ModalBox>
          <Overlay />
        </>
      ) : null}
    </Wrapper>
  );
}
