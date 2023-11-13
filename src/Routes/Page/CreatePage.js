import styled from "styled-components";
import { boxStyle, btnStyle } from "../../styles/commonStyles";
import moment from "moment";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
`;
const PageWrapper = styled.form`
  width: 70%;
  padding: 30px;
  overflow-y: auto;
  height: 100%;
  ${boxStyle}
`;
const PageTitle = styled.div`
  font-size: 30px;
  border-bottom: 2px solid #4d9cd0;
  padding-bottom: 10px;
  display: flex;
  gap: 10px;
`;
const Counter = styled.p`
  margin-top: 5px;
  color: #4d9cd0;
  font-size: 20px;
  text-align: right;
`;

export default function CreatePage() {
  const today = new Date();

  const { register, handleSubmit } = useForm();
  const [counter, setCounter] = useState(0);

  const onValid = (data) => {
    console.log(data);
  };

  const handleCounterChange = (event) => {
    const value = event.target.value;
    setCounter(value.length);
  };

  return (
    <Wrapper>
      <SideWrapper>
        <span className="text-3xl">
          Date: {moment(today).format("YYYY.MM.DD ddd").toUpperCase()}
        </span>
        <WriteBtn onClick={handleSubmit(onValid)}>작성 완료</WriteBtn>
      </SideWrapper>

      <PageWrapper>
        <PageTitle>
          <label htmlFor="subject">Subject:</label>
          <input
            {...register("subject", { required: true })}
            type="text"
            id="subject"
            className="w-[100%] focus:outline-none"
          />
        </PageTitle>
        <textarea
          {...register("content", { required: true })}
          placeholder="일기를 작성해주세요."
          onChange={handleCounterChange}
          maxLength={1500}
          className="w-[100%] h-[90%] p-5 text-lg focus:outline-none"
        ></textarea>
        <Counter>{counter}/1500 자</Counter>
      </PageWrapper>
    </Wrapper>
  );
}
