import React from "react";
import PropTypes from "prop-types";

import layoutDay from "../layoutDay";
import Event from "./Event";
import TimeList from "./TimeList";
import "./DayCalendar.css";

const layoutToStyle = l => ({
  position: "absolute",
  top: `${l.y}px`,
  left: `${l.x}px`,
  width: `${l.width}px`,
  height: `${l.height}px`,
});

const processEvents = events => {
  const computedLayout = layoutDay(events);
  return events.map((event, idx) => ({
    event,
    style: layoutToStyle(computedLayout[idx]),
  }));
};

const DayCalendar = ({ events }) => {
  const processedEvents = processEvents(events);
  return (
    <div className="DayCalendar">
      <TimeList className="DayCalendar__time" />
      <div className="DayCalendar__events">
        {processedEvents.map(({ event, style }, idx) => (
          <Event key={idx} event={event} style={style} />
        ))}
      </div>
    </div>
  );
};

DayCalendar.propTypes = {
  events: PropTypes.array.isRequired,
};

export default DayCalendar;
