"use client";
import suffleArray from "@/lib/suffleArray";
import GameBox from "@/components/GameBox";
import { useGameStore } from "./store/useGameStore";
import GridIcon from "@/components/icons/GridIcon";
import TimerIcon from "@/components/icons/TimerIcon";
import PointerIcon from "@/components/icons/PointerIcon";
import OrderUpDownIcon from "@/components/icons/OrderUpDownIcon";
import OrderDownUpIcon from "@/components/icons/OrderDownUpIcon";
import Head from "next/head";

export default function Home() {
  const buttons = [];
  const {
    matrixSize,
    timeToRemember,
    numberButtonsToRemember,
    answerNumbersOrder,
    setAnswerNumbersOrder,
    answers,
    setAnswers,
    clearAnswers,
    setWrongAnswer,
    gameMixedButtons,
    setGameMixedButtons,
    gameHiddenButtons,
    setGameHiddenButtons,
    gameStartTime,
    setGameStartTime,
    gameFinishTime,
    setGameFinishTime,
  } = useGameStore();

  for (let index = 1; index <= matrixSize * matrixSize; index++) {
    buttons.push(index);
  }

  function initGameData() {
    let tempMixedArr = suffleArray(buttons);
    const tempHiddenButtons = [];
    for (let index = 1; index <= numberButtonsToRemember; index++) {
      tempHiddenButtons.push(tempMixedArr[index]);
    }

    tempMixedArr = suffleArray(buttons);

    tempHiddenButtons.sort((a, b) =>
      answerNumbersOrder === 1 ? a - b : b - a
    );

    setWrongAnswer(null);
    clearAnswers();
    setGameMixedButtons(tempMixedArr);

    setTimeout(() => {
      setGameHiddenButtons(tempHiddenButtons);
      setGameStartTime(new Date());
    }, [timeToRemember]);
  }

  function checkAnswer(el) {
    if (gameHiddenButtons[answers.length] !== el) {
      setWrongAnswer(el);
      setTimeout(() => {
        setWrongAnswer(null);
      }, 500);
    } else {
      setAnswers(el);
      if (answers.length + 1 === numberButtonsToRemember)
        setGameFinishTime(new Date());
    }
  }

  function answerTime() {
    return (gameFinishTime.getTime() - gameStartTime.getTime()) / 1000;
  }

  function cancelGame() {
    setWrongAnswer(null);
    clearAnswers();
    setGameMixedButtons([]);
    setGameHiddenButtons([]);
    setGameStartTime([]);
    setGameFinishTime(null);
  }

  function restartGame() {
    cancelGame();
    setGameFinishTime(null);
  }

  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="SdMMddYYXis7UAElNHK4D5QnMqMLU7QnX7vjGXP1G0g"
        />
        <meta
          name="description"
          content="Jake's App Japan Dev - Explore a fun and interactive app built with Next.js."
        />
        <title>Jake's App Japan Dev</title>
      </Head>
      <div className="flex flex-col h-full justify-center items-center">
        {gameFinishTime ? (
          <div className="text-center">
            <p className="py-8 text-xl">Your answer time: {answerTime()}s.</p>
            <div className="flex justify-center">
              <button className="button" onClick={restartGame}>
                Restart Game
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full">
            {gameMixedButtons.length > 0 ? (
              <>
                <div className="mb-4">
                  <div className="w-full h-2 overflow-hidden rounded-md">
                    <div
                      className="w-full h-full bg-red-400"
                      style={{
                        animation: `timingLineAnimation ${timeToRemember}ms linear forwards`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <GameBox options={{ checkAnswer }} />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center mb-10">
                  <div className="flex items-center mx-6 p-2 bg-gray-200 rounded-lg">
                    <GridIcon className="w-8" />
                    <span className="ml-3 font-bold text-3xl">{matrixSize}</span>
                  </div>
                  <div className="flex items-center mx-6 p-2 bg-gray-200 rounded-lg">
                    <TimerIcon className="w-8" />
                    <span className="ml-3 font-bold text-3xl">
                      {timeToRemember / 1000}s
                    </span>
                  </div>
                  <div className="flex items-center mx-6 p-2 bg-gray-200 rounded-lg">
                    <PointerIcon className="w-8" />
                    <span className="ml-3 font-bold text-3xl">
                      {numberButtonsToRemember}
                    </span>
                  </div>
                  <div className="flex items-center mx-6 p-2 bg-gray-200 rounded-lg">
                    {answerNumbersOrder === 1 ? (
                      <OrderUpDownIcon className="w-8" />
                    ) : (
                      <OrderDownUpIcon className="w-8" />
                    )}
                  </div>
                </div>
                <button className="button mx-1" onClick={initGameData}>
                  Start Game
                </button>
              </div>
            )}
            {gameMixedButtons.length > 0 && (
              <button
                className="button !bg-red-500 mx-1"
                onClick={cancelGame}
              >
                Cancel Game
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
