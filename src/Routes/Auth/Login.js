import styled from "styled-components";
import { boxStyle, btnStyle } from "../../styles/commonStyles";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Wrapper = styled.div`
  width: 70vw;
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

export default function CreateAccount() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onValid = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        data
      );
      // console.log(response.data);
      if (response.data.success) {
        const token = response.data.token;
        console.log(response.data);
        localStorage.setItem("token", token);

        // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
    }
  };

  return (
    <Wrapper>
      <div>
        <h1 className="text-center text-8xl">BIRDEE</h1>
        <h2 className="text-center text-3xl">우리들의 교환일기</h2>
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
        <LoginBtn>LOGIN</LoginBtn>
      </form>

      <div className="flex gap-5 text-xl">
        <span>계정이 없으신가요?</span>
        <Link to="/create-account">
          <span className="text-[#4d9cd0]">CREATE-ACCOUNT</span>
        </Link>
      </div>
    </Wrapper>
  );
}
