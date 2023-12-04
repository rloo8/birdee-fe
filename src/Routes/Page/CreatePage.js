import styled from "styled-components";
import { activeBtnStyle, boxStyle, btnStyle } from "../../styles/commonStyles";
import moment from "moment";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { HOST_URL } from "../../App";

const Wrapper = styled.div`
  display: flex;
  gap: 50px;
  padding: 30px;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const SideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const WriteBtn = styled.button`
  width: 100%;
  ${btnStyle}
  &:active {
    ${activeBtnStyle}
  }
`;
const PageWrapper = styled.form`
  width: 70%;
  padding: 30px;
  overflow-y: auto;
  height: 100%;
  ${boxStyle}
`;
const PageTitle = styled.div`
  font-size: 24px;
  border-bottom: 2px solid #4d9cd0;
  padding-bottom: 10px;
  display: flex;
  gap: 10px;
`;
const Counter = styled.p`
  margin-top: 5px;
  color: #4d9cd0;
  font-size: 18px;
  text-align: right;
`;

export default function CreatePage() {
  const today = new Date();

  const { register, handleSubmit } = useForm();
  const [counter, setCounter] = useState(0);

  const params = useParams();
  const navigate = useNavigate();

  const onValid = async (data) => {
    try {
      const response = await axios.post(
        `${HOST_URL}/diaries/${params.diary_id}/pages`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("페이지 생성 성공:", response.data);
      navigate(`/diaries/${params.diary_id}/pages`);
    } catch (error) {
      console.error("페이지 생성 중 오류 발생: ", error);
    }
  };

  const handleCounterChange = (event) => {
    const value = event.target.value;
    setCounter(value.length);
  };

  return (
    <Wrapper>
      <SideWrapper>
        <span className="text-2xl">
          Date: {moment(today).format("YYYY.MM.DD ddd").toUpperCase()}
        </span>
        <div className="flex gap-5">
          <WriteBtn onClick={handleSubmit(onValid)}>완료</WriteBtn>
          <WriteBtn
            onClick={() => navigate(`/diaries/${params.diary_id}/pages`)}
          >
            취소
          </WriteBtn>
        </div>
      </SideWrapper>

      <PageWrapper>
        <PageTitle>
          <label htmlFor="subject">Subject:</label>
          <input
            {...register("subject", { required: true })}
            type="text"
            id="subject"
            placeholder="제목을 작성해주세요."
            className="w-[100%] focus:outline-none"
          />
        </PageTitle>
        <textarea
          {...register("contents", { required: true })}
          placeholder="일기를 작성해주세요."
          onChange={handleCounterChange}
          maxLength={1500}
          className="w-[100%] h-[90%] p-5 text-md focus:outline-none"
        ></textarea>
        <Counter>{counter}/1500 자</Counter>
      </PageWrapper>
    </Wrapper>
  );
}
