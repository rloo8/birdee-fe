import moment from "moment/moment";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

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
  const [date, setDate] = useState(new Date());
  const uploadDates = ["2023-11-01", "2023-11-03", "2023-11-05", "2023-11-11"];

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
      {/* {moment(date).format("YYYY년 MM월 DD일")} */}
    </CalendarContainer>
  );
}

export default MyCalendar;
