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

const CreateInput = styled.div`
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
const CreateBtn = styled.button`
  ${btnStyle};
`;

export default function CreateAccount() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onValid = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/member",
        data
      );
      console.log("계정 생성 성공: ", response.data);
      navigate("/login");
    } catch (error) {
      console.error("계정 생성 중 오류 발생: ", error);
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
        <CreateInput>
          <label htmlFor="user_id">ID</label>
          <input
            {...register("user_id", { required: true })}
            id="user_id"
            type="text"
          />
        </CreateInput>
        <CreateInput>
          <label htmlFor="email">EMAIL</label>
          <input
            {...register("email", { required: true })}
            id="email"
            type="email"
          />
        </CreateInput>
        <CreateInput>
          <label htmlFor="password">PASSWORD</label>
          <input
            {...register("password", { required: true })}
            id="password"
            type="password"
          />
        </CreateInput>
        <CreateInput>
          <label htmlFor="name">NAME</label>
          <input
            {...register("name", { required: true })}
            id="name"
            type="text"
          />
        </CreateInput>
        <CreateInput>
          <label htmlFor="birth">BIRTH</label>
          <input
            {...register("birth", { required: true })}
            id="birth"
            type="date"
          />
        </CreateInput>
        <CreateInput>
          <input
            {...register("allow_random")}
            id="allow_random"
            type="checkbox"
          />
          <label htmlFor="allow_random">랜덤 초대 허용</label>
        </CreateInput>
        <CreateBtn>Create Account</CreateBtn>
      </form>
      <div className="flex gap-5 text-xl">
        <span>계정이 이미 있으신가요?</span>
        <Link to="/login">
          <span className="text-[#4d9cd0]">LOGIN</span>
        </Link>
      </div>
    </Wrapper>
  );
}
