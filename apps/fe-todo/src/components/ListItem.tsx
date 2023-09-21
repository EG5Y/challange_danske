import React, { useState } from "react";
import { match } from "../utils.ts";
import { TodoBtn, TodoBtnStage } from "./TodoBtn.tsx";
import xLogo from "../../assets/x-solid.svg";

export function ListItem({
  text,
  done,
  onDone,
  onRemove,
  onSave,
}: {
  text: string;
  done: boolean;
  onDone: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  onRemove: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  onSave: (text: string) => Promise<void>;
}) {
  const [isBeingDeleted, setIsBeingDeleted] = useState<boolean>(false);
  const [isBeingUpdated, setIsBeingUpdated] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<string>("");

  return (
    <li className=" flex justify-between gap-4 pl-4 pr-4 py-2 bg-mid-one font-medium rounded-2xl relative   ">
      <input
        onChangeCapture={(event: React.FormEvent<HTMLInputElement>) => {
          setIsChanged(event.currentTarget.value);
        }}
        type="text"
        defaultValue={text}
        className="bg-transparent"
      />
      {match([
        [
          () => Boolean(isChanged),
          () => (
            <TodoBtn
              stage={isBeingUpdated ? TodoBtnStage.saving : TodoBtnStage.save}
              onClick={async () => {
                await onSave(isChanged);
                setIsChanged("");
              }}
              setIsLoading={setIsBeingUpdated}
            />
          ),
        ],
        [
          () => isBeingUpdated,
          () => <TodoBtn stage={TodoBtnStage.updating} done={done} />,
        ],
        [() => isBeingDeleted, () => <TodoBtn stage={TodoBtnStage.removing} />],
        [
          () => true,
          () => (
            <TodoBtn
              stage={TodoBtnStage.ready}
              done={done}
              setIsLoading={setIsBeingUpdated}
              onClick={onDone}
            />
          ),
        ],
      ])}
      {!isBeingUpdated && !isBeingDeleted && (
        <button
          onClick={async (event) => {
            setIsBeingDeleted(true);
            await onRemove(event);
            setIsBeingDeleted(false);
          }}
          className="transition-shadow duration-300 hover:shadow-btn-red absolute top-[-5px] right-[-5px] bg-red-300 text-white font-black rounded-2xl w-[20px] h-[20px] grid items-center justify-center text-[10px]  "
        >
          <img src={xLogo} alt="x" className="w-[8px]" />
        </button>
      )}
    </li>
  );
}
