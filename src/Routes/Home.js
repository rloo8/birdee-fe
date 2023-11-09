import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  boxStyle,
  btnStyle,
  modalBoxStyle,
  solidBtnStyle,
  stokeBtnStyle,
} from "../styles/commonStyles";

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
const StrokeBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  ${stokeBtnStyle}
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
`;
const DiaryTitle = styled.h3`
  font-size: 30px;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 57%;
  transform: translate(-50%, -50%);
`;
const DiaryCover = styled.img`
  width: 100%;
`;
const DiaryBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 55px;
  position: absolute;
  top: -20px;
  right: -20px;
  background-color: #e84118;
  border-radius: 50%;
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 800px;
  height: 400px;
  padding: 30px;
  ${modalBoxStyle}
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  span {
    font-size: 25px;
  }
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

function Home() {
  const [showHidden, setShowHidden] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onHiddenBtnClick = () => {
    if (showDelete) {
      setShowDelete(false);
    }
    setShowHidden(!showHidden);
  };
  const onDeleteBtnClick = () => {
    if (showHidden) {
      setShowHidden(false);
    }
    setShowDelete(!showDelete);
  };

  const onHiddenDiary = () => {
    setShowModal(true);
  };
  const onDeleteDiary = () => {
    setShowModal(true);
  };

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
        <Link to="/create-diary">
          <StrokeBtn>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#4d9cd0"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                clipRule="evenodd"
              />
            </svg>
          </StrokeBtn>
        </Link>
        <StrokeBtn onClick={onHiddenBtnClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#4d9cd0"
            className="w-8 h-8"
          >
            <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
            <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
            <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
          </svg>
        </StrokeBtn>
        <StrokeBtn onClick={onDeleteBtnClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#4d9cd0"
            className="w-8 h-8"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
              clipRule="evenodd"
            />
          </svg>
        </StrokeBtn>
      </BtnWrapper>

      <ContentBox>
        <h1 className="text-5xl pb-[20px]">cat 1</h1>
        <DiaryBox>
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(
            (_, i) => (
              <Diary key={i}>
                {showHidden ? (
                  <DiaryBtn onClick={onHiddenDiary}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#fff"
                      className="w-8 h-8"
                    >
                      <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                      <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                      <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                    </svg>
                  </DiaryBtn>
                ) : null}
                {showDelete ? (
                  <DiaryBtn onClick={onDeleteDiary}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#fff"
                      className="w-8 h-8"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </DiaryBtn>
                ) : null}
                <DiaryTitle>diary1</DiaryTitle>
                <Link to="/diary">
                  <DiaryCover src="/image/b.png" alt="diary" />
                </Link>
              </Diary>
            )
          )}
        </DiaryBox>
      </ContentBox>

      {showModal ? (
        <ModalBox>
          <h3>alert</h3>
          <span>
            {showHidden
              ? "일기장 숨길거니?????"
              : showDelete
              ? "일기장 진짜 삭제할거니??????"
              : null}
          </span>
          <div className="btnBox">
            <button
              onClick={() => {
                setShowModal(false);
              }}
            >
              YES
            </button>
            <button
              onClick={() => {
                setShowModal(false);
              }}
            >
              NO
            </button>
          </div>
        </ModalBox>
      ) : null}
    </Wrapper>
  );
}

export default Home;
