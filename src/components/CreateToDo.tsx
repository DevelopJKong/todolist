import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-width:500px;
  input {
    display: flex;
    justify-content: center;
    width: 70%;
    height: 30px;
    margin-top:15px;
    &:focus {
      outline: none;
    }
  }
  button {
    margin: 5% auto;
    width: 50%;
    border-radius: 2.222rem;
    border: none;
  }
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);

    setValue("toDo", "");
  };
  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
          maxLength: 30
        })}
        placeholder="Write a to do"
        maxLength={30}
      />
      <button>Add</button>
    </Form>
  );
}
export default CreateToDo;
