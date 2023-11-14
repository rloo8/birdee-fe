import styled from "styled-components";
import { boxStyle, btnStyle, modalBoxStyle } from "../styles/commonStyles";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { inviteListState } from "../Components/atoms";
import { useNavigate } from "react-router";
import axios from "axios";

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
  width: 50px;
  height: 50px;
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
  width: 300px;
`;
const DiaryTitleInput = styled.input`
  text-align: center;
  font-size: 30px;
  border-bottom: 4px solid #000;
  outline: none;
  width: 50%;
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
  font-size: 18px;
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

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 800px;
  height: 800px;
  padding: 30px;
  ${modalBoxStyle}
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;
const ErrorMessage = styled.p`
  color: red;
`;

function CreateDiary() {
  const [diaryColor, setDiaryColor] = useState(0);
  const handleColorChange = (event) => {
    setDiaryColor(event.target.value);
  };

  const [showModal, setShowModal] = useState(false);
  const [inviteList, setInviteList] = useRecoilState(inviteListState);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onCustomCheck = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/diaries", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("일기장 생성 성공:", response.data);
      navigate("/");
    } catch (error) {
      console.error("일기장 생성 중 오류 발생: ", error);
    }
  };

  const onAddInvite = (data) => {
    const invitedUser = data.invitedUser;

    if (invitedUser && inviteList.length < 4) {
      setInviteList([...inviteList, invitedUser]);
      setValue("invitedUser", "");
    } else {
      console.error("최대 3명까지만 초대 가능");
    }
  };
  const onDeleteInvite = (index) => {
    const updatedList = [...inviteList];
    updatedList.splice(index, 1);
    setInviteList(updatedList);
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
                onClick={handleColorChange}
                value={i}
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
          <UserInviteBtn onClick={() => setShowModal(true)}>
            친구 초대
          </UserInviteBtn>
        </DiaryBox>
      </CustomBox>

      <CreateBox>
        <span>
          일기장 생성 시 초대한 친구에게 알림이 갑니다.
          <br />
          친구가 초대를 받으면 그때부터 일기를 작성할 수 있습니다.
          <br />
          <br />
          일기는 친구와 번갈아가면서만 작성 가능합니다.
          <br />
          일기는 최대 하루에 한 편만 작성 가능합니다.
        </span>
        <form onSubmit={handleSubmit(onCustomCheck)}>
          <span>일기 내용 수정, 삭제 가능 여부를 체크해주세요.</span>
          <div>
            <input {...register("is_editable")} type="checkbox" id="edit" />
            <label htmlFor="edit">지우기 가능(일기 수정)</label>
          </div>
          <div>
            <input {...register("is_deletable")} type="checkbox" id="delete" />
            <label htmlFor="delete">찢기 가능(일기 삭제)</label>
          </div>
          <CreateBtn>CREATE!</CreateBtn>
        </form>
        {!showModal ? (
          <ul>
            <h3>초대한 친구 목록</h3>
            {inviteList.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        ) : null}
      </CreateBox>

      {showModal ? (
        <ModalBox>
          <h3>친구 초대</h3>
          <form onSubmit={handleSubmit(onAddInvite)}>
            <label htmlFor="invitedUser">
              초대할 친구 아이디를 입력해주세요
            </label>
            <input
              {...register("invitedUser", {
                required: "아이디를 입력해주세요!!",
                validate: {
                  maxFour: (value) =>
                    inviteList.length < 3 || "최대 3명까지만 초대 가능해요",
                },
              })}
              type="text"
              id="invitedUser"
            />
            <button type="submit" onClick={() => {}}>
              추가
            </button>
            <ErrorMessage>{errors.invitedUser?.message}</ErrorMessage>
          </form>
          <ul>
            {inviteList.map((user, index) => (
              <li key={index}>
                {user}
                <button onClick={() => onDeleteInvite(index)}>삭제</button>
              </li>
            ))}
          </ul>
          <CreateBtn
            onClick={() => {
              setShowModal(false);
              setValue("invitedUser", inviteList);
              setValue("color", diaryColor);
            }}
          >
            완료
          </CreateBtn>
        </ModalBox>
      ) : null}
    </Wrapper>
  );
}
export default CreateDiary;
