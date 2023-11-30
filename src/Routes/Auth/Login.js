import styled from "styled-components";
import { boxStyle, btnStyle } from "../../styles/commonStyles";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HOST_URL } from "../../App";
import { useState } from "react";

const Wrapper = styled.div`
  width: 60vw;
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

const LoginInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  color: #4d9cd0;
  font-size: 20px;
  input {
    ${boxStyle};
    padding: 10px;
    color: #333;
    &:focus {
      outline: none;
    }
  }
`;
const LoginBtn = styled.button`
  ${btnStyle};
`;

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  // 에러메세지
  const [errorMessage, setErrorMessage] = useState("");

  const onValid = async (data) => {
    try {
      const response = await axios.post(`${HOST_URL}/auth/login`, data);

      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        if (response.data.message === "incorrect password") {
          setErrorMessage("비밀번호가 올바르지 않습니다.");
        } else if (
          response.data.message.startsWith("not registered username")
        ) {
          setErrorMessage("등록되지 않은 사용자입니다.");
        } else {
          console.log(response.data.message);
        }
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
    }
  };

  return (
    <Wrapper>
      <div>
        <h1 className="text-center text-7xl">BIRDEE</h1>
        <h2 className="text-center text-2xl">우리들의 교환일기</h2>
      </div>

      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col justify-center gap-3"
      >
        <LoginInput>
          <label htmlFor="user_id">ID</label>
          <input
            {...register("user_id", { required: true })}
            id="user_id"
            type="text"
          />
        </LoginInput>
        <LoginInput>
          <label htmlFor="password">PASSWORD</label>
          <input
            {...register("password", { required: true })}
            id="password"
            type="password"
          />
        </LoginInput>
        <span className="text-red-500 text-right">{errorMessage}</span>
        <LoginBtn>LOGIN</LoginBtn>
      </form>

      <div className="flex gap-5 text-md">
        <span>계정이 없으신가요?</span>
        <Link to="/create-account">
          <span className="text-[#4d9cd0]">CREATE-ACCOUNT</span>
        </Link>
      </div>
    </Wrapper>
  );
}
