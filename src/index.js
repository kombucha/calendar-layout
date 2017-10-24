import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import layoutDay from "./layoutDay";

global.layoutDay = layoutDay;

ReactDOM.render(<App />, document.getElementById("root"));
