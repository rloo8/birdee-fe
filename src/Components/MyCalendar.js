import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { HOST_URL } from "../App";

const CalendarContainer = styled.div`
  .react-calendar {
    font-family: "DungGeunMo";
    font-size: 20px;
    border: none;
  }
  .react-calendar__tile--active {
    color: blue;
  }
  .react-calendar__navigation {
    background: #4d9cd0;
    height: 50px;

    span {
      font-size: 20px;
      color: #fff;
    }
  }

  .react-calendar button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  .react-calendar__navigation button:disabled {
    background-color: #4d9cd0;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #eeece8;
  }
`;

const Dot = styled.div`
  height: 8px;
  width: 8px;
  background-color: #f87171;
  border-radius: 50%;
`;

function MyCalendar({ selectedPageId, setSelectedPageId }) {
  const [pages, setPages] = useState([]);
  const [uploadDates, setUploadDates] = useState([]);

  const params = useParams();
  const date = new Date();

  // 페이지 목록 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${HOST_URL}/diaries/${params.diary_id}/pages`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPages(response.data.data.pages);

        // 페이지 업로드 날짜 배열
        const extractedUploadDates = response.data.data.pages.map((page) =>
          moment(page.created_at).format("YYYY-MM-DD")
        );
        setUploadDates(extractedUploadDates);
      } catch (error) {
        console.error("fetch 오류:", error);
      }
    };

    fetchData();
  }, [params.diary_id]);

  // 업로드 날짜 확인 후, 캘린더에 dot 표시
  const uploadContent = ({ date }) => {
    const formatDate = moment(date).format("YYYY-MM-DD");

    const hasUploadContent = uploadDates.includes(formatDate);
    return hasUploadContent ? <Dot /> : null;
  };

  // 클릭 이벤트 핸들러
  const handleDateClick = (clickedDate) => {
    const clickedDateFormatted = moment(clickedDate).format("YYYY-MM-DD");

    // 선택한 날짜에 생성된 page 배열
    const selectedPages = pages.filter(
      (page) =>
        moment(page.created_at).format("YYYY-MM-DD") === clickedDateFormatted
    );

    // 가장 최근에 생성된 페이지 ID 저장
    setSelectedPageId(
      selectedPages.length > 0 ? selectedPages[0].page_id : null
    );
  };

  return (
    <CalendarContainer>
      <Calendar
        onChange={handleDateClick}
        value={date}
        formatDay={(_, date) => moment(date).format("D")}
        tileContent={uploadContent}
        minDetail="year"
        maxDetail="month"
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
      />
    </CalendarContainer>
  );
}

export default MyCalendar;
