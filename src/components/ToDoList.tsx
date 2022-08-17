import { useRecoilValue } from "recoil";
import { toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import { Creator } from "./Creator";
import ToDo from "./ToDo";

export const ToDoList = () => {
  const toDos = useRecoilValue(toDoState);

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
    </>
  );
};
