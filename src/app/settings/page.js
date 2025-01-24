"use client";
import { Slider } from "rsuite";
import "rsuite/dist/rsuite.css";
import { useGameStore } from "../store/useGameStore";

export default function Settings() {
  const {
    matrixSize,
    setMatrixSize,
    timeToRemember,
    numberButtonsToRemember,
    setNumberButtonsToRemember,
    setTimeToRemember,
    setAnswerNumbersOrder,
    answerNumbersOrder,
  } = useGameStore();
  return (
    <div>
      <div className="mt-16">
        <div className="font-bold text-lg">Matrix Size</div>
        <div className="mt-4 px-2">
          <Slider
            defaultValue={matrixSize}
            min={3}
            step={1}
            max={8}
            graduated
            progress
            onChange={(number) => setMatrixSize(number)}
            renderMark={(mark) => {
              return mark;
            }}
          />
        </div>
      </div>

      <div className="mt-16">
        <div className="font-bold text-lg">Number buttons to remember</div>
        <div className="mt-4 px-2">
          <Slider
            defaultValue={numberButtonsToRemember}
            min={4}
            step={matrixSize > 6 ? 3 : 1}
            max={matrixSize * matrixSize}
            graduated
            progress
            onChange={(number) => setNumberButtonsToRemember(number)}
            renderMark={(mark) => {
              return mark;
            }}
          />
        </div>
      </div>

      <div className="mt-16">
        <div className="font-bold text-lg">Time to remember</div>
        <div className="mt-4 px-2">
          <Slider
            defaultValue={timeToRemember / 1000} // convert to seconds
            min={3}
            step={1}
            max={20}
            graduated
            progress
            onChange={(number) => setTimeToRemember(number * 1000)}
            renderMark={(mark) => {
              return `${mark}s`;
            }}
          />
        </div>
      </div>

      <div className="mt-16">
        <div className="font-bold text-lg">Order of the answer buttons</div>
        <div className="mt-4">
          <select
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
            onChange={(e) => setAnswerNumbersOrder(parseInt(e.target.value))}
            value={answerNumbersOrder}
          >
            <option value="1">From smallest to biggest</option>
            <option value="-1">From biggest to smallest</option>
          </select>
        </div>
      </div>
    </div>
  );
}