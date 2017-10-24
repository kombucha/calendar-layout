import React from "react";

import "./Event.css";

const Event = ({ event, style }) => (
  <div className="Event" style={style}>
    <span className="Event__title">{event.title}</span>
    <span className="Event__location">{event.location}</span>
  </div>
);

export default Event;
