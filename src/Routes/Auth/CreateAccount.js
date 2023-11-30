import styled from "styled-components";
import { boxStyle, btnStyle } from "../../styles/commonStyles";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HOST_URL } from "../../App";
import { useState } from "react";

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
  gap: 25px;
  color: #4d9cd0;
  font-size: 20px;
  position: relative;
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
  margin-top: 20px;
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

  // 중복 아이디 검사 결과 state
  // true면 검사 안했거나 이미 있는 아이디, false면 사용 가능 아이디
  const [IdValidation, setIdValidation] = useState(true);

  // 계정 생성
  const onValid = async (data) => {
    try {
      if (!IdValidation) {
        const response = await axios.post(`${HOST_URL}/auth/member`, data);

        console.log("계정 생성 성공: ", response.data);
        navigate("/login");
      } else {
        alert("아이디 중복확인을 해주세요");
      }
    } catch (error) {
      console.error("계정 생성 중 오류 발생: ", error);
    }
  };

  // 아이디 중복 확인
  const onCheckId = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(`${HOST_URL}/auth/check-user`, {
        user_id: watch("user_id"),
      });
      setIdValidation(response.data.success);

      if (!response.data.success) {
        alert("사용 가능한 아이디입니다.");
      } else {
        alert("이미 존재하는 아이디입니다. 다른 아이디를 사용해주세요.");
      }
    } catch (error) {
      console.error("아이디 중복 확인 실패: ", error);
    }
  };

  console.log(IdValidation);

  return (
    <Wrapper>
      <div>
        <h1 className="text-center text-8xl">BIRDEE</h1>
        <h2 className="text-center text-3xl">우리들의 교환일기</h2>
      </div>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col justify-center gap-2"
      >
        <CreateInput>
          <label htmlFor="user_id">ID</label>
          <input
            {...register("user_id", { required: "필수 입력 항목입니다" })}
            id="user_id"
            type="text"
          />
          <button
            onClick={onCheckId}
            className="p-1 text-white bg-[#4d9cd0] text-lg absolute right-2"
          >
            중복확인
          </button>
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
          <label htmlFor="allow_random">랜덤 초대 허용</label>
          <input
            {...register("allow_random")}
            id="allow_random"
            type="checkbox"
            className="w-5 h-5"
          />
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
