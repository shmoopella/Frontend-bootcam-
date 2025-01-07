import { useEffect, useState } from "react";
import { getTime } from "../helpers";

function Stopwatch() {
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
    </div>
  );
}

export default Stopwatch;
