import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

const CalendarContainer = styled.div`
  .react-calendar {
    font-family: "DungGeunMo";
    font-size: 17px;
    border: none;
  }
  .react-calendar__tile--active {
    color: #4d9cd0;
    font-weight: bold;
    background: #fff;
  }
  .react-calendar__navigation {
    background: #4d9cd0;
    height: 50px;
    button {
      font-size: 22px;
    }
    span {
      font-size: 18px;
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
    background-color: #0c7cc5;
  }
`;

const Dot = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 50%;
`;

function MyCalendar({ diary, pages, colors, setSelectedPageId }) {
  const date = new Date();

  // 업로드 날짜 확인 후, 캘린더에 dot 표시
  const uploadContent = ({ date }) => {
    const formatDate = moment(date).format("YYYY-MM-DD");

    // 해당 날짜에 업로드된 페이지들의 user 색상 가져오기
    const userColors = pages
      ?.filter(
        (page) =>
          !page.deleted &&
          moment(page.created_at).format("YYYY-MM-DD") === formatDate
      )
      .map((page) => {
        const userIndex = diary.users.findIndex(
          (user) => user.user_id === page.user_id
        );
        return colors[userIndex];
      });

    return (
      <div style={{ display: "flex", gap: "2px" }}>
        {userColors?.map((color, index) => (
          <Dot key={index} style={{ backgroundColor: color }} />
        ))}
      </div>
    );
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
