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

function MyCalendar() {
  const [pages, setPages] = useState([]);
  const [uploadDates, setUploadDates] = useState([]);

  const params = useParams();

  // 다이어리 정보 조회
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

  const [date, setDate] = useState(new Date());

  // 업로드 날짜 확인 후, 캘린더에 dot 표시
  const uploadContent = ({ date }) => {
    const formatDate = moment(date).format("YYYY-MM-DD");

    const hasUploadContent = uploadDates.includes(formatDate);
    return hasUploadContent ? <Dot /> : null;
  };

  return (
    <CalendarContainer>
      <Calendar
        onChange={setDate}
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
