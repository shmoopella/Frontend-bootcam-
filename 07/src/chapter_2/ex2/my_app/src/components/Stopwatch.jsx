import React, { useEffect, useState } from "react";
import { getTime } from "../helpers";
import SomeList from "./SomeList";

function Stopwatch() {
  const [list, setList] = useState([]);
  function addValue(value) {
    setList((prevlist) => [...prevlist, value]);
    console.log("fvgf");
  }

  function reset() {
    setList([]);
    console.log("вхвхахахахаха");
  }
  const [time, setTime] = useState("00:00:00");
  const start = new Date();
  useEffect(() => {
    const timer = setInterval(() => setTime(getTime(start)), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="component-container stopwatch">
      <img src="/img/stopwatch.gif" alt="stopwatch" />
      <div className="time">{time}</div>
      <button onClick={() => addValue(time)}>Add</button>
      <button onClick={() => reset()}>Reset</button>
      <div className="somelist">
        <SomeList list={list} />
      </div>
    </div>
  );
}

export default Stopwatch;
