import React, { Component } from "react";
import DayCalendar from "./components/DayCalendar";
import "./App.css";

const TEST_EVENTS = [
  { start: 30, end: 150 },
  { start: 540, end: 600 },
  { start: 560, end: 620 },
  { start: 610, end: 670 },
  // Test case
  // { start: 0, end: 500 },
  // { start: 0, end: 60 },
  // { start: 0, end: 60 },
  // { start: 0, end: 60 },
  // { start: 0, end: 60 },
  // { start: 0, end: 60 },
  // { start: 400, end: 600 },
  // { start: 500, end: 700 },
].map(e => ({ ...e, title: "Sample Item", location: "Sample Location" }));

class App extends Component {
  render() {
    return (
      <div className="App">
        <DayCalendar events={TEST_EVENTS} />
      </div>
    );
  }
}

export default App;
