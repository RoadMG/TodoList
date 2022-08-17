import React from "react";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IToDo {
  boardId: string;
  toDoText: string;
  toDoId: number;
}
const ToDo = ({ boardId, toDoText, toDoId }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);
  const toDos = useRecoilValue(toDoState);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const source = boardId;
    const destination = e.currentTarget.textContent;

    setToDos((allThings) => {
      const targetIndex = allThings[boardId].findIndex(
        (toDo) => toDo.id === toDoId
      );
      const sourceCategory = [...allThings[source]];
      const taskObj = sourceCategory[targetIndex];
      const destinationCategory = [...allThings[destination as any]];
      sourceCategory.splice(targetIndex, 1);
      destinationCategory.splice(1, 0, taskObj);

      return {
        ...allThings,
        [source]: sourceCategory,
        [destination as any]: destinationCategory,
      };
    });
  };

  const deleteToDo = () => {
    setToDos((allThings) => {
      const targetIndex = allThings[boardId].findIndex(
        (toDo) => toDo.id === toDoId
      );
      const oldToDos = [...allThings[boardId]];
      oldToDos.splice(targetIndex, 1);

      return { ...allThings, [boardId]: oldToDos };
    });
  };

  return (
    <>
      <p>
        {toDoText}
        {Object.keys(toDos)
          .filter((prop) => prop !== boardId)
          .map((name) => (
            <button name={boardId} key={name} onClick={onClick}>
              {name}
            </button>
          ))}
        <button onClick={deleteToDo}>Delete</button>
      </p>
    </>
  );
};

export default ToDo;
