import styled from "styled-components";
import { boxStyle, btnStyle, modalBoxStyle } from "../../styles/commonStyles";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { HOST_URL } from "../../App";
import { async } from "q";

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

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 700px;
  height: 350px;
  padding: 30px;
  ${modalBoxStyle}
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  .btnBox {
    display: flex;
    justify-content: space-between;
    gap: 50px;
    width: 70%;
  }
  button {
    width: 100%;
    ${btnStyle}
  }
`;

export default function Page() {
  const [pages, setPages] = useState([]);
  const [diary, setDiary] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // page api 호출
        const pageResponse = await axios.get(
          `${HOST_URL}/diaries/${params.diary_id}/pages/${params.page_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPages(pageResponse.data.page);

        // diary api 호출 (수정, 삭제 가능 여부)
        const diaryResponse = await axios.get(
          `${HOST_URL}/diaries/${params.diary_id}/pages`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDiary(diaryResponse.data.data);
      } catch (error) {
        console.error("fetch 오류:", error);
      }
    };

    fetchData();
  }, [params.page_id]);

  // 페이지 수정or삭제 가능한 일기장인지 여부
  const is_deletable = diary.is_deletable;
  const is_editable = diary.is_editable;

  // 페이지 삭제 함수
  const handleDeleteClick = async () => {
    try {
      await axios.delete(
        `${HOST_URL}/diaries/${params.diary_id}/pages/${params.page_id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("삭제 성공");
      navigate(`/diaries/${params.diary_id}/pages`);
    } catch (error) {
      console.error("페이지 삭제 중 오류 발생: ", error);
    }
  };

  return (
    <Wrapper>
      <SideWrapper>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 cursor-pointer mb-3"
            onClick={() => navigate(`/diaries/${params.diary_id}/pages`)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <span className="text-3xl">
            Date:{" "}
            {moment(pages.createdAt).format("YYYY.MM.DD ddd").toUpperCase()}
          </span>
        </div>

        <div className="flex gap-5">
          {is_editable && <WriteBtn>수정</WriteBtn>}
          {is_deletable && (
            <WriteBtn onClick={() => setShowModal(true)}>삭제</WriteBtn>
          )}
        </div>
      </SideWrapper>

      <PageWrapper>
        <PageTitle>{pages.subject}</PageTitle>
        <p className="w-[100%] h-[90%] p-5 text-lg focus:outline-none">
          {pages.contents}
        </p>
      </PageWrapper>

      {showModal && (
        <ModalBox>
          <span className="text-2xl text-center">
            일기를 삭제하시겠습니까?
            <br />
            삭제한 일기는 복구할 수 없습니다.
          </span>
          <div className="btnBox">
            <button onClick={handleDeleteClick}>예</button>
            <button onClick={() => setShowModal(false)}>아니오</button>
          </div>
        </ModalBox>
      )}
    </Wrapper>
  );
}
