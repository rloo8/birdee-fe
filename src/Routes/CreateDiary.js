import styled from "styled-components";
import { boxStyle, btnStyle, modalBoxStyle } from "../styles/commonStyles";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { inviteListState } from "../Components/atoms";
import { useNavigate } from "react-router";
import axios from "axios";
import { HOST_URL } from "../App";
import { motion } from "framer-motion";

// styled components
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  height: 100vh;
`;

const CustomBox = styled.div`
  display: flex;
  width: 50%;
  padding: 30px;
  ${boxStyle}
`;
const ColorSelectBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-self: flex-end;
`;
const Color = styled.button`
  width: 45px;
  height: 45px;
  border: 2px solid #bbb;
`;

const DiaryBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  height: 100%;
`;
const DiaryCover = styled.img`
  width: 250px;
`;
const DiaryTitleInput = styled.input`
  text-align: center;
  font-size: 27px;
  border-bottom: 4px solid #000;
  outline: none;
  width: 220px;
  padding: 10px;
`;

const UserInviteBtn = styled.button`
  ${btnStyle}
  background-color: #edece8;
`;

const CreateBox = styled.div`
  width: 50%;
  text-align: center;
  color: #6e7071;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  line-height: 1.5em;
`;
const CreateBtn = styled.button`
  width: 40%;
  ${btnStyle}
`;

const ModalBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 550px;
  height: 450px;
  padding: 30px;
  ${modalBoxStyle}
`;
const ErrorMessage = styled.p`
  color: red;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

// frame-motion variants
const modalVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
    x: "-50%",
    y: "-50%",
  },
  end: {
    opacity: 1,
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

function CreateDiary() {
  // 일기장 컬러 index
  const [diaryColor, setDiaryColor] = useState(0);

  const [showModal, setShowModal] = useState(false);

  const [invitedUser, setInvitedUser] = useState("");
  const [inviteList, setInviteList] = useRecoilState(inviteListState);

  // 친구 초대 에러메시지
  const [inviteError, setInviteError] = useState("");

  // 랜덤친구 초대 state
  const [isRandomInvited, setIsRandomInvited] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  const navigate = useNavigate();

  // Create 버튼 클릭 시 post
  const onCreateClick = async (data) => {
    try {
      if (isRandomInvited) {
        // 랜덤 친구 초대 체크 시
        const response = await axios.post(`${HOST_URL}/diaries`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("일기장 생성 성공:", response.data);
        navigate("/");
      } else {
        // 랜덤 친구 초대 체크하지 않은 경우
        if (inviteList.length === 0) {
          alert("초대할 친구를 입력해주세요");
        } else {
          const response = await axios.post(`${HOST_URL}/diaries`, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          console.log("일기장 생성 성공:", response.data);
          navigate("/");
        }
      }
    } catch (error) {
      console.error("일기장 생성 중 오류 발생: ", error);
    }
  };

  // 친구 아이디 추가 버튼 클릭
  const onAddInvite = async (e) => {
    e.preventDefault();

    // 존재하는 아이디인지 체크
    const response = await axios.post(
      `${HOST_URL}/auth/check-user`,
      {
        user_id: invitedUser,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      if (invitedUser && inviteList.length < 3) {
        setInviteList([...inviteList, invitedUser]);
        setInvitedUser("");
        setInviteError("");
      } else {
        setInviteError("최대 3명까지만 초대 가능합니다.");
      }
    } else {
      setInviteError(response.data.message);
    }
  };

  // 친구 아이디 삭제
  const onDeleteInvite = (index) => {
    const updatedList = [...inviteList];
    updatedList.splice(index, 1);
    setInviteList(updatedList);
    setInviteError("");
  };

  return (
    <Wrapper>
      <CustomBox>
        <ColorSelectBox>
          {["#EDECE8", "#E4DBA4", "#BAC7AF", "#EACFCB", "#AACAD1"].map(
            (color, i) => (
              <Color
                key={i}
                style={{ background: color }}
                value={i}
                onClick={() => setDiaryColor(i)}
              ></Color>
            )
          )}
        </ColorSelectBox>
        <DiaryBox>
          <DiaryCover src={`/image/${diaryColor}.png`} alt="diary" />
          <DiaryTitleInput
            {...register("title", { required: true })}
            type="text"
            placeholder="일기장 이름"
          />
          <UserInviteBtn
            onClick={() => {
              setShowModal(true);
              setInvitedUser("");
            }}
          >
            친구 초대
          </UserInviteBtn>
        </DiaryBox>
      </CustomBox>

      <CreateBox>
        {inviteList.length > 0 ? (
          <div className="flex flex-col items-center p-3 border-2 border-[#4d9cd0] border-solid w-[250px]">
            <span className="mt-[-22px] mb-3 bg-[#FAF2DF] w-[70%]">
              초대한 친구 목록
            </span>
            {inviteList.map((user, index) => (
              <span key={index}>{user}</span>
            ))}
          </div>
        ) : null}
        <span>
          일기장을 만들면 초대한 친구들의 메일에 초대장을 보냅니다.
          <br />
          모든 친구들이 초대를 받으면 그때부터 일기를 작성할 수 있어요.
          <br />
          <br />
          일기는 하루에 하나만 쓸 수 있으며,
          <br />
          초대 받은 순서대로 작성할 수 있어요.
        </span>
        <form
          onSubmit={handleSubmit(onCreateClick)}
          className="flex flex-col items-center gap-5"
        >
          <div>
            <span>일기 수정, 삭제 가능 여부를 체크해주세요.</span>
            <div className="flex justify-center items-center gap-3">
              <input
                {...register("is_editable")}
                type="checkbox"
                id="edit"
                className="w-5 h-5"
              />
              <label htmlFor="edit">일기 수정 가능</label>
            </div>
            <div className="flex justify-center items-center gap-3">
              <input
                {...register("is_deletable")}
                type="checkbox"
                id="delete"
                className="w-5 h-5"
              />
              <label htmlFor="delete">일기 삭제 가능</label>
            </div>
          </div>

          <CreateBtn>CREATE!</CreateBtn>
        </form>
      </CreateBox>

      {showModal ? (
        <>
          <ModalBox variants={modalVariants} initial="start" animate="end">
            <h3>친구 초대</h3>
            <form
              onSubmit={onAddInvite}
              className="flex flex-col gap-10 items-center"
            >
              {/* 친구 초대 입력 폼 */}
              <div
                className="flex flex-col gap-3 justify-center items-center"
                style={{ display: isRandomInvited ? "none" : "" }}
              >
                <label htmlFor="invitedUsers" className="text-md">
                  초대할 친구 아이디를 입력해주세요.
                </label>
                <div className="flex gap-5">
                  <input
                    type="text"
                    id="invitedUsers"
                    value={invitedUser}
                    onChange={(e) => setInvitedUser(e.target.value)}
                    className="p-1"
                  />
                  <button type="submit" className="text-white bg-[#4d9cd0] p-2">
                    추가
                  </button>
                </div>
                {inviteError && (
                  <ErrorMessage className="text-sm">{inviteError}</ErrorMessage>
                )}
              </div>

              {/* 초대 친구 리스트 */}
              <ul className="text-xl">
                {inviteList.map((user, index) => (
                  <li key={index} className="flex items-center gap-4">
                    {user}
                    <button onClick={() => onDeleteInvite(index)}>
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        color="#000000"
                        strokeWidth="1.5"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9.70164 8.64124C9.40875 8.34835 8.93388 8.34835 8.64098 8.64124C8.34809 8.93414 8.34809 9.40901 8.64098 9.7019L10.9391 12L8.64098 14.2981C8.34809 14.591 8.34809 15.0659 8.64098 15.3588C8.93388 15.6517 9.40875 15.6517 9.70164 15.3588L11.9997 13.0607L14.2978 15.3588C14.5907 15.6517 15.0656 15.6517 15.3585 15.3588C15.6514 15.0659 15.6514 14.591 15.3585 14.2981L13.0604 12L15.3585 9.7019C15.6514 9.40901 15.6514 8.93414 15.3585 8.64124C15.0656 8.34835 14.5907 8.34835 14.2978 8.64124L11.9997 10.9393L9.70164 8.64124Z"
                          fill="#000000"
                        ></path>
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>

              {/* 랜덤 친구 초대 체크박스 */}
              <div className="flex gap-3 items-center">
                <input
                  {...register("is_random")}
                  type="checkbox"
                  checked={isRandomInvited}
                  onChange={() => {
                    setIsRandomInvited(!isRandomInvited);
                    setInvitedUser("");
                    setInviteList([]);
                  }}
                  id="random"
                  className="w-5 h-5"
                />
                <label htmlFor="random ">
                  랜덤 친구와 일기 쓰기
                  <p className="text-xs text-gray-500">
                    모르는 친구와 일기를 쓸 수 있어요
                  </p>
                </label>
              </div>
            </form>

            <CreateBtn
              onClick={() => {
                setShowModal(false);
                setValue("invitedUsers", inviteList);
                setValue("color", diaryColor);
                setInviteError("");
              }}
            >
              완료
            </CreateBtn>
          </ModalBox>
          <Overlay />
        </>
      ) : null}
    </Wrapper>
  );
}
export default CreateDiary;
