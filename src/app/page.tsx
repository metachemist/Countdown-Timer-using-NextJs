"use client";
import { useEffect, useState } from "react";

export default function Home(){
  const [timeLeft, setTimeLeft] = useState(60); // Set initial time in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer); // Cleanup the timer
  }, [isRunning, timeLeft]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(60); // Reset to initial time
  };


  return (
    <main>
      <div className="flex flex-col">
        <div className="text-6xl font-bold mb-6">
          {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
          {String(timeLeft % 60).padStart(2, "0")}
        </div>
        <div className="space-x-4">
          {isRunning?(<button onClick={handleStart} className="bg-green-400">Start</button>):(<button className="bg-pink-500" onClick={handlePause}>Pause</button>)}
          <button onClick={handleReset} className="bg-slate-400">Reset</button>
        </div>
      </div>
    </main>
  );
}


