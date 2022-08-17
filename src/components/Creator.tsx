import React from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
  category: string;
}

export const Creator = () => {
  const setCategory = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const onValid = ({ category }: IForm) => {
    const newCategory = {
      text: category,
    };

    setCategory((allThings) => {
      return { ...allThings, [newCategory.text]: [] };
    });
    setValue("category", "");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          type="text"
          placeholder="Add categories"
          {...register("category", { required: true })}
        />
        <button>Add</button>
      </form>
    </>
  );
};
