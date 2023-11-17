import styled from "styled-components";
import { boxStyle, btnStyle } from "../../styles/commonStyles";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HOST_URL } from "../../App";

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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  console.log(watch());

  const onValid = async (data) => {
    try {
      const response = await axios.post(`${HOST_URL}/auth/member`, data);
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
            {...register("user_id", { required: "필수 입력 항목입니다" })}
            id="user_id"
            type="text"
          />
        </CreateInput>
        <span className="text-red-500 text-sm text-right">
          {errors?.user_id?.message}
        </span>

        <CreateInput>
          <label htmlFor="email">EMAIL</label>
          <input
            {...register("email", {
              required: "필수 입력 항목입니다",
              validate: {
                emailFormat: (value) =>
                  value.includes("@") || "이메일 형식을 지켜주세요",
              },
            })}
            id="email"
            type="email"
          />
        </CreateInput>
        <span className="text-red-500 text-sm text-right">
          {errors?.email?.message}
        </span>

        <CreateInput>
          <label htmlFor="password">PASSWORD</label>
          <input
            {...register("password", { required: "필수 입력 항목입니다" })}
            id="password"
            type="password"
          />
        </CreateInput>
        <span className="text-red-500 text-sm text-right">
          {errors?.password?.message}
        </span>

        <CreateInput>
          <label htmlFor="passwordConfirmation">PASSWORD CONFIRM</label>
          <input
            {...register("passwordConfirmation", {
              required: "필수 입력 항목입니다",
              validate: {
                passwordConfirmation: (value) =>
                  value === watch("password") ||
                  "비밀번호가 일치하지 않습니다.",
              },
            })}
            id="passwordConfirmation"
            type="password"
          />
        </CreateInput>
        <span className="text-red-500 text-sm text-right">
          {errors?.passwordConfirmation?.message}
        </span>

        <CreateInput>
          <label htmlFor="name">NAME</label>
          <input
            {...register("name", { required: "필수 입력 항목입니다" })}
            id="name"
            type="text"
          />
        </CreateInput>
        <span className="text-red-500 text-sm text-right">
          {errors?.name?.message}
        </span>

        <CreateInput>
          <label htmlFor="birth">BIRTH</label>
          <input
            {...register("birth", { required: "필수 입력 항목입니다" })}
            id="birth"
            type="date"
          />
        </CreateInput>
        <span className="text-red-500 text-sm text-right">
          {errors?.birth?.message}
        </span>

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
