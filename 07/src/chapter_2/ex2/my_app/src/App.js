import React, { useState } from "react";
import StudentInfo from "./components/StudentInfo";
import Stopwatch from "./components/Stopwatch";
import "./App.css";

function App() {
  const [activeComponent, setActiveComponent] = useState("studentinfo");

  function stopwatchClick() {
    setActiveComponent("stopwatch");
  }

  function studentinfoClick() {
    setActiveComponent("studentinfo");
  }

  return (
    <div className="App">
      <button onClick={stopwatchClick}>Stopwatch</button>
      <button onClick={studentinfoClick}>StudentInfo</button>

      {activeComponent === "stopwatch" && <Stopwatch />}
      {activeComponent === "studentinfo" && <StudentInfo />}
    </div>
  );
}

export default App;
