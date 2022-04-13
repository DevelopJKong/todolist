import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoBox = styled.div`
  width: 50%;
  height: 80%;
  min-width: 400px;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin: 6% auto;
  position: relative;
  background-color: #74b9ff;
  border-radius: 2.2222rem;
  box-shadow: -1px 0px 19px -1px rgb(0 0 0 / 30%);
`;

const TitleBox = styled.div`
  display:flex;
  align-items:center;
  flex-direction:column;
  margin-top:5%;
  
  select {
    margin-bottom: 3%;
    width: 200px;
    height: 40px;
    border-radius: 2.2222rem;
    border: none;
    appearance: none;
    text-align: center;
    &:focus {
      outline: none;
      box-shadow: rgba(0, 0, 0, 0.5);
    }
  }
`;

const ContentBox = styled.div`
  height: 50%;
  min-height: 200px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 5%;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <ToDoBox>
      <TitleBox>
        <Title>⭐To Do List ⭐</Title>
        <select value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </select>
      </TitleBox>
      <ContentBox>
        <CreateToDo />
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ContentBox>
    </ToDoBox>
  );
}
export default ToDoList;
