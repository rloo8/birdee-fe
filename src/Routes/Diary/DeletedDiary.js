import styled from "styled-components";
import { boxStyle, solidBtnStyle } from "../../styles/commonStyles";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { HOST_URL } from "../../App";

// styled components
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const SolidBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  ${solidBtnStyle}
`;
const ContentBox = styled.div`
  width: 80%;
`;

const DiaryBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 70px;
  padding: 100px;
  ${boxStyle}
  overflow-y: auto;
  height: 100%;
`;
const Diary = styled.div`
  position: relative;
  width: 200px;
  height: 230px;
`;
const DiaryTitle = styled.h3`
  font-size: 20px;
  text-align: center;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 57%;
  transform: translate(-50%, -50%);
`;
const DiaryCover = styled.img`
  width: 100%;
`;

export default function DeletedDiary() {
  const [deletedDiaries, setDeletedDiaries] = useState([]);

  // 삭제한 일기장 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${HOST_URL}/auth/member`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setDeletedDiaries(response.data.data.deletedDiaries);
        console.log(response.data.data.deletedDiaries);
      } catch (error) {
        console.error("fetch 오류:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Wrapper>
      <BtnWrapper>
        <Link to="/mypage">
          <SolidBtn className="mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#fff"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </SolidBtn>
        </Link>
      </BtnWrapper>

      <ContentBox>
        <h1 className="text-5xl pb-[20px]">삭제한 일기장</h1>
        <h1 className="text-xl pb-[20px]">
          삭제 후 7일간 보관됩니다. 일기를 백업해주세요.
        </h1>
        <DiaryBox>
          {deletedDiaries?.map((diary) => (
            <Diary key={diary.id}>
              <DiaryTitle>{diary.title}</DiaryTitle>
              <Link to={`/diaries/${diary.id}/pages`}>
                <DiaryCover
                  src={`/image/${diary.color}.png`}
                  alt={diary.title}
                />
              </Link>
            </Diary>
          ))}
        </DiaryBox>
      </ContentBox>
    </Wrapper>
  );
}
