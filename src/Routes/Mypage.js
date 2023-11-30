import { Link, useNavigate } from "react-router-dom";
import {
  boxStyle,
  btnStyle,
  modalBoxStyle,
  solidBtnStyle,
} from "../styles/commonStyles";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { HOST_URL } from "../App";
import TooltipButton from "../Components/TooltipButton";
import { motion } from "framer-motion";

// styled components
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  padding: 30px;
  height: 100vh;
`;

const BoxWrapper = styled.div`
  position: relative;
  width: 35vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  gap: 15px;
  &:first-of-type {
    ${boxStyle}
  }
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  ${boxStyle}
  span {
    font-size: 20px;
    color: #4d9cd0;
  }
  span:nth-child(2) {
    color: #000;
  }
`;

const ModalBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 30px;
  width: 550px;
  padding: 40px;
  ${modalBoxStyle}

  .btnBox {
    display: flex;
    justify-content: space-between;
    gap: 50px;
    button {
      width: 100%;
      ${btnStyle}
    }
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

function Mypage() {
  const [user, setUser] = useState({});
  const [ShowModal, setShowModal] = useState(null);

  // 에러메세지
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  // 유저 정보 조회
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

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 회원 탈퇴 시 비밀번호 확인
  const handleDeleteAccount = async (data) => {
    try {
      const checkResponse = await axios.post(
        `${HOST_URL}/auth/check-password`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // 비밀번호 일치 시 탈퇴
      if (checkResponse.data.success) {
        try {
          await axios.delete(`${HOST_URL}/auth/member`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          localStorage.removeItem("token");
          navigate("/login");
        } catch (error) {
          console.error("회원 탈퇴에 실패하였습니다.");
        }
      } else {
        setErrorMessage("비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("fetch 오류:", error);
    }
  };

  return (
    <Wrapper>
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
          left="100%"
        />
      </Link>

      <div className="flex gap-20 self-center">
        <BoxWrapper>
          <Link to="/mypage/edit" className="absolute right-5 top-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#4d9cd0"
              className="w-8 h-8"
            >
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
              <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
            </svg>
          </Link>
          <h2 className="text-4xl mb-2">My Profile</h2>
          {user.image ? (
            <img
              src={user.image}
              alt="profile"
              className="w-40 h-40 object-cover"
            />
          ) : (
            <img
              src={`https://stbirdee.blob.core.windows.net/images/default_profileImg.png`}
              alt="profile"
              className="w-48 h-48 object-cover"
            />
          )}

          <Box>
            <span>name</span>
            <span>{user.name}</span>
          </Box>
          <Box>
            <span>birth</span>
            <span>{user.birth}</span>
          </Box>
          <Box>
            <span>email</span>
            <span>{user.email}</span>
          </Box>
          <Box>
            <span>작성한 일기</span>
            <span>{user.pages_count}</span>
          </Box>
          <Box>
            <span>랜덤 일기장 초대</span>
            <span>{user.allow_random ? "허용" : "비허용"}</span>
          </Box>
        </BoxWrapper>

        <BoxWrapper className="flex flex-col">
          <div className="flex flex-col w-full gap-3">
            <Box
              onClick={() => setShowModal("invite")}
              className="cursor-pointer"
            >
              <span>초대 목록({user?.inviteList?.length})</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#4d9cd0"
                className="w-7 h-7"
              >
                <path
                  fillRule="evenodd"
                  d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Box>
            <Link to="/diaries/hidden" className="w-full">
              <Box>
                <span>숨긴 일기장</span>
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#4d9cd0"
                >
                  <path
                    d="M19.5 16L17.0248 12.6038"
                    stroke="#4d9cd0"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M12 17.5V14"
                    stroke="#4d9cd0"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M4.5 16L6.96895 12.6124"
                    stroke="#4d9cd0"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M3 8C6.6 16 17.4 16 21 8"
                    stroke="#4d9cd0"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </Box>
            </Link>
            <Link to="/diaries/deleted" className="w-full">
              <Box>
                <span>삭제한 일기장</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 25 25"
                  fill="#4d9cd0"
                  className="w-7 h-7"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clipRule="evenodd"
                  />
                </svg>
              </Box>
            </Link>
          </div>

          <div className="flex flex-col w-full gap-3">
            <Box
              onClick={() => setShowModal("logout")}
              className="cursor-pointer"
            >
              <span>LOGOUT</span>
            </Box>
            <Box
              onClick={() => setShowModal("delete")}
              className="cursor-pointer"
            >
              <span>회원탈퇴</span>
            </Box>
          </div>
        </BoxWrapper>
      </div>

      {/* //모달창 */}
      {ShowModal === "logout" ? (
        <>
          <ModalBox variants={modalVariants} initial="start" animate="end">
            <span className="text-xl p-7">로그아웃 하시겠습니까?</span>
            <div className="btnBox w-[60%]">
              <button onClick={handleLogout}>예</button>
              <button onClick={() => setShowModal(null)}>아니오</button>
            </div>
          </ModalBox>
          <Overlay />
        </>
      ) : ShowModal === "delete" ? (
        <>
          <ModalBox variants={modalVariants} initial="start" animate="end">
            <span className="text-2xl">정말 탈퇴하시겠습니까?</span>
            <span className="text-md text-center">
              탈퇴를 원하실 경우
              <br />
              아래 입력창에 <span className="text-red-500">비밀번호</span>를
              입력 후,
              <br />
              탈퇴 버튼을 눌러주세요.
            </span>
            <form
              onSubmit={handleSubmit(handleDeleteAccount)}
              className="flex flex-col gap-2"
            >
              <input
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                  validate: {},
                })}
                type="password"
                className="p-2"
              />
              <p className="text-red-500 text-center">{errorMessage}</p>
              <div className="btnBox w-full pt-5">
                <button type="submit">탈퇴</button>
                <button onClick={() => setShowModal(null)}>취소</button>
              </div>
            </form>
          </ModalBox>
          <Overlay />
        </>
      ) : ShowModal === "invite" ? (
        <>
          <ModalBox variants={modalVariants} initial="start" animate="end">
            <div className="text-center">
              <h2 className="text-2xl">초대 목록</h2>
              <span className="text-md">메일을 확인해주세요.</span>
            </div>
            <ul>
              {user?.inviteList.map((invite, index) => (
                <li
                  key={index}
                  className="bg-white px-7 py-2 m-3 flex items-center gap-5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#FFC83D"
                    className="w-8 h-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.25 9a6.75 6.75 0 0113 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-md">
                    {invite.owner_name}님이 [{invite.title}] 다이어리에
                    초대했습니다.
                  </span>
                </li>
              ))}
            </ul>
            <div className="btnBox">
              <button onClick={() => setShowModal(null)}>닫기</button>
            </div>
          </ModalBox>
          <Overlay />
        </>
      ) : null}
    </Wrapper>
  );
}
export default Mypage;
