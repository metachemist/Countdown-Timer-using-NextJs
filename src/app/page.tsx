"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Comic_Neue } from "next/font/google"

const ComicNeue = Comic_Neue({
  weight: ["300", "400", "700"], // Specify the weights you need
  style: ["normal", "italic"], // Define styles if needed
  subsets: ["latin"],
});

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(60); // Set initial time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [inputValue, setInputValue] = useState(""); // For handling input

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

  const handleSetTime = () => {
    const parsedValue = parseInt(inputValue, 10);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      setTimeLeft(parsedValue); // Update timer
      setIsRunning(false); // Ensure the timer is not running when set
    } else {
      alert("Please enter a valid number of seconds.");
    }
  };

  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 bg-[url('/floweringstreet2.jpg')] bg-cover bg-center text-white">
        <div className={`flex flex-col items-center justify-center bg-blue h-auto w-11/12 sm:w-96 rounded-lg shadow-[0_0_30px_15px_rgba(61,154,180,255)] ${ComicNeue.className}`}>
          <label className="font-bold text-3xl mb-3 mt-2 text-center">Countdown Timer</label>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} // Update input value
              className="text-sm w-full sm:w-56 h-8 mb-2 sm:mb-0 border border-white rounded px-2 text-white placeholder-white"
              placeholder="Enter Duration in seconds"
            />
            <button
              onClick={handleSetTime} // Set the timer when clicked
              className="bg-brown font-semibold text-white px-5 py-2 rounded-3xl hover:bg-lightBrown w-full sm:w-auto mt-2 sm:mt-0">
              Set
            </button>
          </div>

          <div className="text-4xl font-bold mb-3 mt-2">
            {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
            {String(timeLeft % 60).padStart(2, "0")}
          </div>
          <div className="space-x-5 my-2">
            {isRunning ? (
              <button className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-3xl hover:bg-yellow-600" onClick={handlePause}>
                Pause
              </button>
            ) : (
              <button onClick={handleStart} className="px-6 py-2 bg-green text-white font-semibold rounded-3xl hover:bg-lightGreen">
                Start
              </button>
            )}
            <button onClick={handleReset} className="px-6 py-2 bg-red text-white font-semibold rounded-3xl hover:bg-lightRed">
              Reset
            </button>
          </div>
        </div>
      </div>

    </main>
  );
}


