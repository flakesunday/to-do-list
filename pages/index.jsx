import React from "react";
import { RxCrossCircled } from "react-icons/rx";
import { Card, Form, Button, Toast, ToastBody } from "react-bootstrap";

export function Task({ name, removeToDo }) {
  return (
    <Toast className="my-3" style={{ boxShadow: "none" }}>
      <ToastBody style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{name}</div>
        <div>
          <a onClick={()=>removeToDo(name)}>
   
            <RxCrossCircled />
          </a>
        </div>
      </ToastBody>
    </Toast>
  );
}
export default function Home() {
  const [todoItem, setToDoItem] = React.useState("");
  const [toDoList, setToDoList] = React.useState([]);
  const arrayA = ["1", "2", "5", "6"];
  const addToDo = (e) => {
    e.preventDefault();
    if (todoItem !== "") {
      setToDoList([...toDoList, todoItem]);
      setToDoItem("");
      // localStorage.setItem('todo',JSON.stringify(arrayA))
    }
  };
  React.useEffect(() => {
    if (toDoList.length !== 0) {
      const stringArray = JSON.stringify(toDoList);
      localStorage.setItem("todo", stringArray);
    }


  }, [toDoList]);
  React.useEffect(() => {
    if (localStorage.todo) {
      const initialToDoList = JSON.parse(localStorage.getItem("todo"));
      setToDoList(initialToDoList);
      // console.log(initialToDoList);
    }
  }, []);
  React.useEffect(() => {
    console.log(toDoList);
  }, [toDoList]);
  const removeToDo  = (e) => {
   console.log(e)
    const notRemoveToDo = toDoList.filter((item)=> e !== item)
    // console.log(notRemoveToDo)
    setToDoList(notRemoveToDo)
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{ width: "700px", height: "600px", backgroundColor: "white" }}
      >
        <div className="p-3">
          <div>
            <Form onSubmit={addToDo}>
              <div className="row">
                <div className="col-8">
                  <Form.Control
                    value={todoItem}
                    onChange={(e) => {
                      setToDoItem(e.target.value);
                    }}
                  />
                </div>
                <div className="col-4">
                  <Button type="submit">submit</Button>
                </div>
              </div>
            </Form>
          </div>
          <div>
            {toDoList.length ? (
              <>
                {toDoList.map((item, index) => (
                  <>
                    <Task key={index} name={item} removeToDo={removeToDo} />
                  </>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
