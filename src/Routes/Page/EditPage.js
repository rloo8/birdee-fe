import styled from "styled-components";
import { boxStyle, btnStyle } from "../../styles/commonStyles";
import moment from "moment";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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

export default function EditPage() {
  const [page, setPage] = useState();

  const { register, handleSubmit, setValue } = useForm({ mode: "onChange" });
  const [counter, setCounter] = useState(0);

  const params = useParams();
  const navigate = useNavigate();

  // 기존 페이지 get
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageResponse = await axios.get(
          `${HOST_URL}/diaries/${params.diary_id}/pages/${params.page_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPage(pageResponse.data.page);
        setCounter(pageResponse.data.page.contents.length);

        setValue("subject", pageResponse.data.page.subject);
        setValue("contents", pageResponse.data.page.contents);
      } catch (error) {
        console.error("페이지 불러오기 중 오류 발생: ", error);
      }
    };

    fetchData();
  }, [params.page_id]);

  // 페이지 수정
  const onValid = async (data) => {
    try {
      const response = await axios.put(
        `${HOST_URL}/diaries/${params.diary_id}/pages/${params.page_id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("페이지 수정 성공:", response.data);
      navigate(`/diaries/${params.diary_id}/pages/${params.page_id}`);
    } catch (error) {
      console.error("페이지 수정 중 오류 발생: ", error);
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
          Date: {moment(page?.createdAt).format("YYYY.MM.DD ddd").toUpperCase()}
        </span>
        <div className="flex gap-5">
          <WriteBtn onClick={handleSubmit(onValid)}>수정</WriteBtn>
          <WriteBtn
            onClick={() =>
              navigate(`/diaries/${params.diary_id}/pages/${params.page_id}`)
            }
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
