import { useGameStore } from "@/app/store/useGameStore";

export default function GameBox({ options }) {
  const { checkAnswer } = options;

  const {
    gameMixedButtons,
    gameHiddenButtons,
    matrixSize,
    answers,
    wrongAnswer,
  } = useGameStore();

  function setClasses(el) {
    if (!gameHiddenButtons.length) return;

    let className = "";

    if (!gameHiddenButtons.includes(el)) {
      className = "gridButton__hidden";
    } else {
      if (!answers.includes(el)) {
        if (wrongAnswer === el) {
          className = "gridButton__wrongAnswer";
        } else {
          className = "gridButton__closedAnswer";
        }
      }
    }

    return className;
  }

  function isButtonDisabled(el) {
    return !gameHiddenButtons.includes(el) || answers.includes(el);
  }

  return (
    <div
      className={`my-4 flex flex-wrap border-t border-r border-black box-content`}
      style={{
        width: matrixSize * 60 + "px",
      }}
    >
      {gameMixedButtons.map((el) => {
        return (
          <div
            key={el}
            style={{
              width: 60 + "px",
              height: 60 + "px",
            }}
            className="flex justify-center items-center"
          >
            <button
              disabled={isButtonDisabled(el)}
              className={`w-full h-full border-l border-b border-black ${setClasses(
                el
              )}`}
              onClick={() => checkAnswer(el)}
            >
              {el}
            </button>
          </div>
        );
      })}
    </div>
  );
}