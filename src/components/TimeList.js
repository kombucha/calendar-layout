import React from "react";

import "./TimeList.css";

const range = (min, max, step = 1) => {
  const r = [];
  for (let value = min; value <= max; value += step) {
    r.push(value);
  }

  return r;
};

const formatToTime = minutes => {
  const hours = 9 + Math.floor(minutes / 60);
  const minutesInHour = minutes % 60;
  const formattedHour = hours % 12 || 12;
  const formattedMinutesInHour =
    minutesInHour < 10 ? `0${minutesInHour}` : minutesInHour;

  const time = `${formattedHour}:${formattedMinutesInHour}`;
  const period = hours < 12 ? "AM" : "PM";

  return { time, period };
};

const timeValues = range(0, 12 * 60, 30).map(formatToTime);

const TimeList = () => (
  <ul className="TimeList">
    {timeValues.map((time, idx) => {
      const isHalfHour = idx % 2 === 1;
      const className = [
        "TimeList__item",
        isHalfHour ? "TimeList__item--half-hour" : "",
      ].join(" ");

      return (
        <li key={idx} className={className}>
          <span className="item__time">{time.time}</span>
          <span className="item__period">{time.period}</span>
        </li>
      );
    })}
  </ul>
);

export default TimeList;
