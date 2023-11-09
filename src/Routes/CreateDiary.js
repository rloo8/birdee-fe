import styled from "styled-components";
import { boxStyle, btnStyle } from "../styles/commonStyles";

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

function CreateDiary() {
  return (
    <Wrapper>
      <CustomBox>
        <ColorSelectBox>
          {["#EDECE8", "#E4DBA4", "#BAC7AF", "#EACFCB", "#AACAD1"].map(
            (color, i) => (
              <Color key={i} style={{ background: color }}></Color>
            )
          )}
        </ColorSelectBox>
        <DiaryBox>
          <DiaryCover src="/image/b.png" alt="diary" />
          <DiaryTitleInput type="text" placeholder="일기장 이름" />
          <UserInviteBtn>친구 초대</UserInviteBtn>
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
        <form>
          <span>일기 내용 수정, 삭제 가능 여부를 체크해주세요.</span>
          <div>
            <input type="checkbox" id="edit" />
            <label htmlFor="edit">지우기 가능(일기 수정)</label>
          </div>
          <div>
            <input type="checkbox" id="delete" />
            <label htmlFor="delete">찢기 가능(일기 삭제)</label>
          </div>
        </form>
        <CreateBtn>CREATE!</CreateBtn>
      </CreateBox>
    </Wrapper>
  );
}
export default CreateDiary;
