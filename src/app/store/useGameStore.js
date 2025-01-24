import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useGameStore = create(
  persist((set) => ({
    matrixSize: 3,
    numberButtonsToRemember: 4,
    timeToRemember: 3000, // milliseconds
    answerNumbersOrder: 1, // 1 - from smallest to biggest
    answers: [],
    wrongAnswer: null,
    gameMixedButtons: [],
    gameHiddenButtons: [],
    gameStartTime: null,
    gameFinishTime: null,
    setMatrixSize: (size) => set(() => ({ matrixSize: size })),
    setNumberButtonsToRemember: (numberOfButtons) =>
      set(() => ({ numberButtonsToRemember: numberOfButtons })),
    setTimeToRemember: (time) => set(() => ({ timeToRemember: time })),
    setAnswerNumbersOrder: (order) =>
      set(() => ({ answerNumbersOrder: order })),
    setAnswers: (answerValue) =>
      set((state) => ({ answers: [...state.answers, answerValue] })),
    clearAnswers: () => set(() => ({ answers: [] })),
    setWrongAnswer: (wrongAnswerValue) =>
      set(() => ({ wrongAnswer: wrongAnswerValue })),
    setGameMixedButtons: (arr) => set(() => ({ gameMixedButtons: arr })),
    setGameHiddenButtons: (arr) => set(() => ({ gameHiddenButtons: arr })),
    setGameStartTime: (time) => set(() => ({ gameStartTime: time })),
    setGameFinishTime: (time) => set(() => ({ gameFinishTime: time })),
  }))
);