import React, { Component } from "react";
import DayCalendar from "./components/DayCalendar";
import "./App.css";

const TEST_EVENTS = [
  { start: 30, end: 150 },
  { start: 540, end: 600 },
  { start: 560, end: 620 },
  { start: 610, end: 670 },
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
