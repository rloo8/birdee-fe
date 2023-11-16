import { Link, useNavigate } from "react-router-dom";
import { solidBtnStyle } from "../styles/commonStyles";
import styled from "styled-components";

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

function Mypage() {
  const navigate = useNavigate();

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
      <button onClick={handleLogout} className="text-xl">
        LOGOUT
      </button>
    </Wrapper>
  );
}
export default Mypage;
