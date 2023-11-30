import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  boxStyle,
  btnStyle,
  modalBoxStyle,
  solidBtnStyle,
  stokeBtnStyle,
} from "../styles/commonStyles";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { inviteListState } from "../Components/atoms";
import { HOST_URL } from "../App";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TooltipButton from "../Components/TooltipButton";
import { motion } from "framer-motion";

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

//좌측 버튼 컴포넌트
const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const SolidBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  ${solidBtnStyle}
`;
const StrokeBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  ${stokeBtnStyle}
`;

const ContentBox = styled.div`
  width: 80%;
  position: relative;
`;

// 카테고리 컴포넌트
const CategoryBox = styled.ul`
  position: absolute;
  left: -49px;
  bottom: 0;
  display: flex;
  flex-direction: column-reverse;
`;
const CategoryBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-left: 2px solid #4d9cd0;
  border-right: 2px solid #4d9cd0;
  border-top: 2px solid #4d9cd0;
  width: 50px;
  padding: 10px;
  writing-mode: vertical-rl;
  text-orientation: upright;
  font-size: 16px;
`;

// 일기장 컴포넌트
const DiaryBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 50px;
  padding: 80px;
  ${boxStyle}
  overflow-y: auto;
  height: 100%;
`;
const Diary = styled.div`
  position: relative;
  width: 160px;
  height: 180px;
  transition: transform 0.2s ease;
`;
const DiaryTitle = styled.h3`
  font-size: 18px;
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
const DiaryBtn = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  position: absolute;
  top: -15px;
  right: -15px;
  background-color: #e84118;
  border-radius: 50%;
`;

// 모달창 컴포넌트
const ModalBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 600px;
  height: 300px;
  padding: 25px;
  ${modalBoxStyle}

  span {
    font-size: 20px;
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
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

// frame-motion variants
const btnVariants = {
  start: {
    scale: 0,
  },
  end: {
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.5,
      duration: 1,
    },
  },
  exit: {
    scale: 0,
  },
};
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

function Home() {
  const [diaries, setDiaries] = useState([]);
  const [showBtn, setShowBtn] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [selectedDiaryId, setSelectedDiaryId] = useState(null);

  // 카테고리
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 카테고리 이름
  const [editedCategoryName, setEditedCategoryName] = useState();
  const [editMode, setEditMode] = useState(false);

  // 카테고리에 hover했을 때
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // 페이지네이션
  const [lastId, setLastId] = useState(null);
  const [firstId, setFirstId] = useState(null);

  // 일기장 생성 클릭 시 이전 초대목록 비우기 위해
  const setInviteList = useSetRecoilState(inviteListState);

  // 전체 일기장 목록 조회
  const getAllCategory = async () => {
    try {
      const response = await axios.get(`${HOST_URL}/diaries`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          lastId: lastId,
          firstId: firstId,
        },
      });

      setDiaries(response.data.result.Diaries);
    } catch (error) {
      console.error("fetch 오류:", error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, [lastId, firstId]);

  // 일기장 숨김 삭제 버튼 클릭
  const onBtnClick = (mode) => {
    if (showBtn === mode) {
      setShowBtn(null);
    } else {
      setShowBtn(mode);
    }
  };
  const handleYesClick = async () => {
    try {
      if (showBtn === "hidden") {
        await axios.put(
          `${HOST_URL}/diaries/${selectedDiaryId}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("숨김 성공");
      }
      if (showBtn === "delete") {
        await axios.delete(
          `${HOST_URL}/diaries/${selectedDiaryId}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("삭제 성공");
      }
      getAllCategory();
    } catch (error) {
      console.error("일기장 숨김 삭제 중 오류 발생:", error);
    } finally {
      setShowModal(false);
      setShowBtn(null);
      setSelectedDiaryId(null);
    }
  };

  // 카테고리 리스트 조회
  const updateCategories = async () => {
    try {
      const response = await axios.get(`${HOST_URL}/category`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategories(response.data.category);
    } catch (error) {
      console.error("fetch 오류:", error);
    }
  };
  useEffect(() => {
    updateCategories();
  }, []);

  // 카테고리 생성
  const createNewCategory = async () => {
    try {
      const response = await axios.post(
        `${HOST_URL}/category`,
        {
          cname: "New",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("카테고리 생성 성공: ", response.data);
      updateCategories();
    } catch (error) {
      console.error("카테고리 생성 실패: ", error);
    }
  };

  // 해당 카테고리 목록 조회
  const handleCategoryClick = async (category) => {
    // 클릭한 카테고리의 ID를 state에 저장
    setSelectedCategory(category);

    try {
      const response = await axios.get(
        `${HOST_URL}/category/${category.id}/diaries`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setDiaries(response.data.result.Diaries);
    } catch (error) {
      console.error("fetch 오류:", error);
    }
  };

  // 카테고리 이름 수정
  const handleEditSubmit = async () => {
    try {
      // API 호출
      await axios.put(
        `${HOST_URL}/category/${selectedCategory.id}`,
        {
          // 수정된 카테고리 이름
          cname: editedCategoryName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("카테고리 수정 성공");

      updateCategories();
      setEditMode(false);
      setSelectedCategory({ cname: editedCategoryName });
    } catch (error) {
      console.error("카테고리 수정 실패: ", error);
    }
  };

  // 카테고리 edit 모드로 변경
  const editCategory = async () => {
    setEditMode(!editMode);
    setEditedCategoryName(selectedCategory.cname);
  };

  // 해당 카테고리 삭제
  const deleteCategory = async () => {
    try {
      const response = await axios.delete(
        `${HOST_URL}/category/${selectedCategory.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("카테고리 삭제 성공:", response.data);
      updateCategories();
    } catch (error) {
      console.error("카테고리 삭제 중 오류 발생:", error);
    }
  };

  // 카테고리에 일기장 드래그해서 추가
  const onDragEnd = async (result) => {
    if (!result) {
      return;
    }

    const diaryId = result.draggableId;

    if (hoveredCategory) {
      try {
        const response = await axios.put(
          `${HOST_URL}/category/${hoveredCategory}/diaries`,
          {
            diary_id: diaryId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("카테고리에 추가 성공: ", response.data.success);
        handleCategoryClick(selectedCategory);
      } catch (error) {
        console.error("카테고리에 추가 실패: ", error);
      }
    }
  };

  return (
    <Wrapper>
      <BtnWrapper>
        <Link to="/mypage">
          <TooltipButton
            text="마이페이지"
            btnType="solid"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#fff"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            }
            left="100%"
          />
        </Link>
        <Link to="/diaries/create" onClick={() => setInviteList([])}>
          <TooltipButton
            text="일기장 만들기"
            btnType="stroke"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#4d9cd0"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                  clipRule="evenodd"
                />
              </svg>
            }
            left="100%"
          />
        </Link>
        <TooltipButton
          text="일기장 숨김"
          btnType="stroke"
          onClick={() => onBtnClick("hidden")}
          icon={
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              strokeWidth="3.5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#4d9cd0"
            >
              <path
                d="M19.5 16L17.0248 12.6038"
                stroke="#4d9cd0"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M12 17.5V14"
                stroke="#4d9cd0"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M4.5 16L6.96895 12.6124"
                stroke="#4d9cd0"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 8C6.6 16 17.4 16 21 8"
                stroke="#4d9cd0"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          }
          left="100%"
        />
        <TooltipButton
          text="일기장 삭제"
          btnType="stroke"
          onClick={() => onBtnClick("delete")}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#4d9cd0"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                clipRule="evenodd"
              />
            </svg>
          }
          left="100%"
        />
      </BtnWrapper>

      <ContentBox>
        <CategoryBox>
          <li>
            <SolidBtn onClick={createNewCategory}>
              <svg
                width="35px"
                height="35px"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#fff"
              >
                <path
                  d="M6 12H12M18 12H12M12 12V6M12 12V18"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </SolidBtn>
          </li>
          <li>
            <CategoryBtn
              onClick={() => {
                getAllCategory();
                setSelectedCategory(null);
              }}
            >
              ALL
            </CategoryBtn>
          </li>
          {categories.map((category) => (
            <li
              key={category.id}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <CategoryBtn onClick={() => handleCategoryClick(category)}>
                {category.cname}
              </CategoryBtn>
            </li>
          ))}
        </CategoryBox>

        <div className="flex justify-between items-center">
          {editMode ? (
            <input
              type="text"
              value={editedCategoryName}
              onChange={(e) => setEditedCategoryName(e.target.value)}
              className="text-2xl p-[10px] mb-[10px]"
            />
          ) : (
            <h1 className="text-3xl pb-[20px]">
              {selectedCategory ? selectedCategory.cname : "ALL"}
            </h1>
          )}

          <div className="flex gap-3">
            {editMode ? (
              <>
                <button
                  onClick={handleEditSubmit}
                  className="bg-[#4d9cd0] text-white p-2"
                >
                  수정
                </button>
                <button
                  onClick={editCategory}
                  className="bg-[#4d9cd0] text-white p-2"
                >
                  취소
                </button>
              </>
            ) : selectedCategory ? (
              <>
                <button onClick={editCategory}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#4d9cd0"
                    className="w-7 h-7"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                  </svg>
                </button>
                <button onClick={deleteCategory}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#4d9cd0"
                    className="w-7 h-7"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </>
            ) : null}
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="diary" direction="horizontal">
            {(magic) => (
              <DiaryBox ref={magic.innerRef} {...magic.droppableProps}>
                {diaries?.map((diary, index) => (
                  <Draggable
                    draggableId={String(diary.id)}
                    index={index}
                    key={String(diary.id)}
                  >
                    {(magic) => (
                      <Diary
                        ref={magic.innerRef}
                        {...magic.dragHandleProps}
                        {...magic.draggableProps}
                      >
                        {showBtn === "hidden" ? (
                          <DiaryBtn
                            variants={btnVariants}
                            initial="start"
                            animate="end"
                            exit="exit"
                            whileHover={{ scale: 1.1 }}
                            onClick={() => {
                              setSelectedDiaryId(diary.id);
                              setShowModal(true);
                            }}
                          >
                            <svg
                              width="20px"
                              height="20px"
                              viewBox="0 0 24 24"
                              strokeWidth="3"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              color="#fff"
                            >
                              <path
                                d="M19.5 16L17.0248 12.6038"
                                stroke="#fff"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M12 17.5V14"
                                stroke="#fff"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M4.5 16L6.96895 12.6124"
                                stroke="#fff"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M3 8C6.6 16 17.4 16 21 8"
                                stroke="#fff"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </DiaryBtn>
                        ) : null}
                        {showBtn === "delete" ? (
                          <DiaryBtn
                            variants={btnVariants}
                            initial="start"
                            animate="end"
                            exit="exit"
                            whileHover={{ scale: 1.1 }}
                            onClick={() => {
                              setSelectedDiaryId(diary.id);
                              setShowModal(true);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="#fff"
                              className="w-6 h-6"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </DiaryBtn>
                        ) : null}
                        <DiaryTitle>{diary.title}</DiaryTitle>
                        <Link to={`/diaries/${diary.id}/pages`}>
                          <DiaryCover
                            src={`/image/${diary.color}.png`}
                            alt={diary.title}
                          />
                        </Link>
                      </Diary>
                    )}
                  </Draggable>
                ))}
                {magic.placeholder}
              </DiaryBox>
            )}
          </Droppable>
        </DragDropContext>
      </ContentBox>

      {/* 페이지네이션 버튼 */}
      <div className="flex gap-1 absolute bottom-[30px]">
        <StrokeBtn
          onClick={() => {
            setFirstId(diaries[0]?.id);
            setLastId(null);
          }}
        >
          <svg
            width="20px"
            height="20px"
            viewBox="2 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#4d9cd0"
            strokeWidth="1.5"
          >
            <path
              d="M17.0282 5.2672C17.4217 4.95657 18 5.23682 18 5.73813V18.2619C18 18.7632 17.4217 19.0434 17.0282 18.7328L9.09651 12.4709C8.79223 12.2307 8.79223 11.7693 9.09651 11.5291L17.0282 5.2672Z"
              fill="#4d9cd0"
              stroke="#4d9cd0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </StrokeBtn>
        <StrokeBtn
          onClick={() => {
            setLastId(diaries[diaries.length - 1]?.id);
            setFirstId(null);
          }}
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 20 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#4d9cd0"
            strokeWidth="1.5"
          >
            <path
              d="M6.97179 5.2672C6.57832 4.95657 6 5.23682 6 5.73813V18.2619C6 18.7632 6.57832 19.0434 6.97179 18.7328L14.9035 12.4709C15.2078 12.2307 15.2078 11.7693 14.9035 11.5291L6.97179 5.2672Z"
              fill="#4d9cd0"
              stroke="#4d9cd0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </StrokeBtn>
      </div>

      {showModal ? (
        <>
          <ModalBox variants={modalVariants} initial="start" animate="end">
            <h3>alert</h3>
            <span>
              {showBtn === "hidden"
                ? "일기장을 숨기시겠습니까?"
                : showBtn === "delete"
                ? "일기장을 삭제하시겠습니까?"
                : null}
            </span>
            <div className="btnBox">
              <button onClick={handleYesClick}>YES</button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedDiaryId(null);
                }}
              >
                NO
              </button>
            </div>
          </ModalBox>
          <Overlay />
        </>
      ) : null}
    </Wrapper>
  );
}

export default Home;
