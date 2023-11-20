import { Link } from "react-router-dom";
import { boxStyle, solidBtnStyle } from "../styles/commonStyles";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { HOST_URL } from "../App";
import { useForm } from "react-hook-form";

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

const BoxWrapper = styled.form`
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
  font-size: 25px;
  label {
    color: #4d9cd0;
  }
  input {
    color: #000;
    outline: none;
    text-align: right;
  }
`;

export default function EditProfile() {
  const [user, setUser] = useState({});
  const [profileImg, setProfileImg] = useState(null);

  const { register, handleSubmit, watch, setValue } = useForm();

  const ref = useRef();
  // 기존 유저 정보 조회
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
        setProfileImg(response.data.data.image);

        setValue("name", response.data.data.name);
        setValue("birth", response.data.data.birth);
        setValue("email", response.data.data.email);
        setValue("allow_random", response.data.data.allow_random);
      } catch (error) {
        console.error("fetch 오류:", error);
      }
    };

    fetchData();
  }, []);

  // console.log(profileImg);

  // 프로필 이미지 변경 시
  const handleProfileImgChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setProfileImg(imgUrl);
      console.log(profileImg);
    }
  };

  // 회원 정보 수정
  const onEditProfile = async (e) => {
    try {
      const formData = new FormData();

      const imgFile = await fetch(profileImg).then((res) => res.blob());
      formData.append("profileImg", imgFile);

      formData.append("name", watch("name"));
      formData.append("birth", watch("birth"));
      formData.append("email", watch("email"));
      formData.append("allow_random", watch("allow_random"));

      const response = await axios.put(`${HOST_URL}/auth/member`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("프로필 업데이트 성공:", response.data);
    } catch (error) {
      console.error("프로필 업데이트 오류:", error);
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
        <button
          onClick={handleSubmit(onEditProfile)}
          className="absolute right-5 top-5"
        >
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
        </button>

        <h2 className="text-5xl">My Profile</h2>

        <label className="w-56 h-56 m-10 flex items-center justify-center border-2 border-dashed rounded-md border-gray-300 hover:border-[#4d9cd0] hover:text-[#4d9cd0] cursor-pointer">
          {profileImg ? (
            <img
              src={profileImg}
              alt="profile"
              className="w-48 h-48 object-cover"
            />
          ) : (
            <img
              src={`https://stbirdee.blob.core.windows.net/images/default_profileImg.png`}
              alt="profile"
              className="w-48 h-48 object-cover"
            />
          )}
          <input
            className="hidden"
            type="file"
            onChange={handleProfileImgChange}
          />
        </label>

        <Box>
          <label htmlFor="name">name</label>
          <input {...register("name")} type="text" id="name" />
        </Box>
        <Box>
          <label htmlFor="birth">birth</label>
          <input {...register("birth")} type="date" id="birth" />
        </Box>
        <Box>
          <label htmlFor="email">email</label>
          <input {...register("email")} type="email" id="email" />
        </Box>
        <Box>
          <label htmlFor="allow_random">랜덤일기 허용</label>
          <input
            {...register("allow_random")}
            type="checkbox"
            id="allow_random"
          />
        </Box>
      </BoxWrapper>
    </Wrapper>
  );
}
