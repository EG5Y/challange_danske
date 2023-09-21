import React from "react";
import { match } from "../utils.ts";
import spinnerLogo from "../../assets/spinner-solid.svg";

export enum TodoBtnStage {
  ready,
  removing,
  save,
  saving,
  updating,
}

export function TodoBtn({
  done,
  setIsLoading,
  onClick,
  stage,
}: {
  children?: React.ReactNode;
  done?: boolean;
  setIsLoading?: React.Dispatch<boolean>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  stage: TodoBtnStage;
}) {
  const style = match([
    [
      () => stage == TodoBtnStage.save || stage == TodoBtnStage.saving,
      () =>
        "bg-blue-300 transition-shadow duration-300 hover:shadow-btn-one text-white font-black rounded-2xl px-4 py-1",
    ],
    [
      () => stage == TodoBtnStage.removing,
      () =>
        "bg-red-300 transition-shadow duration-300 hover:shadow-btn-green text-white font-black rounded-2xl px-4 py-1",
    ],
    [
      () => stage == TodoBtnStage.ready || stage == TodoBtnStage.updating,
      () =>
        done
          ? "bg-green-300 transition-shadow duration-300 hover:shadow-btn-green"
          : "bg-yellow-300 transition-shadow duration-300 hover:shadow-btn-yellow",
    ],
  ]);

  return (
    <button
      onClick={async (event) => {
        if (onClick && setIsLoading) {
          setIsLoading(true);
          await onClick(event);
          setIsLoading(false);
        }
      }}
      className={`${style} text-white font-black rounded-2xl px-4 py-1`}
    >
      {match([
        [
          () =>
            stage === TodoBtnStage.removing ||
            stage === TodoBtnStage.updating ||
            stage === TodoBtnStage.saving,
          () => (
            <img
              src={spinnerLogo}
              className=" animate-spin w-[100px] h-[24px] "
              alt="Loading..."
            />
          ),
        ],
        [() => stage === TodoBtnStage.save, () => <> SAVE </>],
        [
          () => stage === TodoBtnStage.ready,
          () => <> {done ? "COMPLETED" : "UNFINISHED"} </>,
        ],
      ])}
    </button>
  );
}
