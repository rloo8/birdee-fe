import { Link, useNavigate } from "react-router-dom";
import { btnStyle, modalBoxStyle, solidBtnStyle } from "../styles/commonStyles";
import styled from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
const SolidBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  ${solidBtnStyle}
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 600px;
  height: 300px;
  padding: 30px;
  ${modalBoxStyle}
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
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

function Mypage() {
  const [showLogoutModal, setShowLogoutModal] = useState(null);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 회원 탈퇴
  const handleDeleteAccount = () => {
    console.log("탈퇴 테스트");
  };

  return (
    <Wrapper>
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

      <div>
        <Link to="/diaries/hidden">숨긴 일기장</Link>
        <Link to="/diaries/deleted">삭제한 일기장</Link>
      </div>
      <button onClick={() => setShowLogoutModal("logout")} className="text-xl">
        LOGOUT
      </button>
      <button onClick={() => setShowLogoutModal("delete")} className="text-xl">
        회원탈퇴
      </button>

      {/* //모달창 */}
      {showLogoutModal === "logout" ? (
        <ModalBox>
          <span className="text-2xl">로그아웃 하시겠습니까?</span>
          <div className="btnBox">
            <button onClick={handleLogout}>예</button>
            <button onClick={() => setShowLogoutModal(null)}>아니오</button>
          </div>
        </ModalBox>
      ) : showLogoutModal === "delete" ? (
        <ModalBox>
          <span className="text-3xl">정말 탈퇴하시겠습니까?</span>
          <span className="text-lg text-center">
            탈퇴를 원하실 경우
            <br />
            아래 입력창에 비밀번호를 입력하시고
            <br />
            탈퇴 버튼을 눌러주세요.
          </span>
          <form onSubmit={handleSubmit(handleDeleteAccount)}>
            <input
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                validate: {},
              })}
              type="password"
            />
            <div className="btnBox">
              <button type="submit">탈퇴</button>
              <button onClick={() => setShowLogoutModal(null)}>취소</button>
            </div>
          </form>
        </ModalBox>
      ) : null}
    </Wrapper>
  );
}
export default Mypage;
