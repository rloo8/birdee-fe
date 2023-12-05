import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HOST_URL } from "../../App";
import { boxStyle, btnStyle } from "../../styles/commonStyles";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 50vw;
  padding: 40px;
  ${boxStyle}
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const AcceptBtn = styled.button`
  width: 300px;
  ${btnStyle}
`;

const InviteAccept = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const invitedToken = searchParams.get("token");

  const navigate = useNavigate();

  // 초대 수락 클릭 시
  const onInviteAccept = async () => {
    try {
      const response = await axios.post(
        `${HOST_URL}/diaries/invite`,
        {
          token: invitedToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.data.success) {
        alert(response.data.message);
      }

      navigate("/");
    } catch (error) {
      console.error("초대수락 실패", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100%]">
      <Wrapper>
        <div>
          <h1 className="text-center text-8xl">BIRDEE</h1>
          <h2 className="text-center text-3xl">우리들의 교환일기</h2>
        </div>

        <AcceptBtn onClick={onInviteAccept}>초대 수락</AcceptBtn>

        {/* <div className="flex gap-5 text-xl">
          <span>로그인 후 수락해주세요</span>
          <Link to="/login">
            <span className="text-[#4d9cd0]">Login</span>
          </Link>
        </div> */}
      </Wrapper>
    </div>
  );
};

export default InviteAccept;
