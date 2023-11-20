import { Link } from "react-router-dom";
import { boxStyle, solidBtnStyle } from "../styles/commonStyles";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { HOST_URL } from "../App";

// styled components
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  height: 100vh;
`;

const SolidBtn = styled.button`
  position: absolute;
  top: 30px;
  left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  ${solidBtnStyle}
`;

const BoxWrapper = styled.div`
  position: relative;
  width: 50vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 15px;
  &:first-of-type {
    ${boxStyle}
  }
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px;
  ${boxStyle}
  span {
    font-size: 25px;
    color: #4d9cd0;
  }
  span:nth-child(2) {
    color: #000;
  }
`;

export default function EditProfile() {
  const [user, setUser] = useState({});
  const [profileImg, setProfileImg] = useState(null);

  // 유저 정보 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${HOST_URL}/auth/member`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUser(response.data.data);
      } catch (error) {
        console.error("fetch 오류:", error);
      }
    };

    fetchData();
  }, []);

  // 프로필 이미지 등록
  const handleProfileImg = async (event) => {
    const file = event.target.files[0];
    setProfileImg(file);
  };

  const onSave = async () => {
    try {
      if (profileImg) {
        const formData = new FormData();
        formData.append("profileImg", profileImg);

        const response = await axios.put(`${HOST_URL}/auth/member`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log(response.data);
      } else {
        console.error("No image selected");
      }
    } catch (error) {
      console.error("프로필 이미지 업데이트 오류:", error);
    }
  };

  return (
    <Wrapper>
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

      <BoxWrapper>
        <Link to="/mypage/edit" className="absolute right-5 top-5">
          <svg
            width="35px"
            height="35px"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#4d9cd0"
          >
            <path
              d="M3 19V5C3 3.89543 3.89543 3 5 3H16.1716C16.702 3 17.2107 3.21071 17.5858 3.58579L20.4142 6.41421C20.7893 6.78929 21 7.29799 21 7.82843V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z"
              stroke="#4d9cd0"
              strokeWidth="1.5"
            ></path>
            <path
              d="M8.6 9H15.4C15.7314 9 16 8.73137 16 8.4V3.6C16 3.26863 15.7314 3 15.4 3H8.6C8.26863 3 8 3.26863 8 3.6V8.4C8 8.73137 8.26863 9 8.6 9Z"
              stroke="#4d9cd0"
              strokeWidth="1.5"
            ></path>
            <path
              d="M6 13.6V21H18V13.6C18 13.2686 17.7314 13 17.4 13H6.6C6.26863 13 6 13.2686 6 13.6Z"
              stroke="#4d9cd0"
              strokeWidth="1.5"
            ></path>
          </svg>
        </Link>
        <h2 className="text-5xl">My Profile</h2>
        <label className="w-56 h-56 m-10 flex items-center justify-center border-2 border-dashed rounded-md border-gray-300 hover:border-[#4d9cd0] hover:text-[#4d9cd0] cursor-pointer">
          {profileImg ? (
            <img
              src={URL.createObjectURL(profileImg)}
              alt="profile"
              className="w-48 h-48 object-cover"
            />
          ) : (
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <input
            className="hidden"
            name="profileImg"
            type="file"
            onChange={handleProfileImg}
          />
        </label>
        <button onClick={onSave}>저장</button>
        <Box>
          <span>name</span>
          <span>{user.name}</span>
        </Box>
        <Box>
          <span>birth</span>
          <span>{user.birth}</span>
        </Box>
      </BoxWrapper>
    </Wrapper>
  );
}
