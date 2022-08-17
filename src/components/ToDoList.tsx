import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import { Creator } from "./Creator";
import ToDo from "./ToDo";

export const ToDoList = () => {
  const toDos = useRecoilValue(toDoState);
  const setToDos = useSetRecoilState(toDoState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setToDos(event.currentTarget.value as any);
  };

  return (
    <>
      <h1>ToDo List</h1>
      <Creator />
      <hr />
      <ul>
        {Object.keys(toDos).map((boardId) => (
          <li value={boardId} key={boardId}>
            {boardId}
            <CreateToDo boardId={boardId} />
            {toDos[boardId].map((toDo) => (
              <ToDo
                key={toDo.id}
                {...toDo}
                boardId={boardId}
                toDoText={toDo.text}
                toDoId={toDo.id}
              />
            ))}
            <hr />
          </li>
        ))}
      </ul>
      {/* <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))} */}
    </>
  );
};
