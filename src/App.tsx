import { createEffect, createSignal, For } from "solid-js";

import "./app.css";
import Table from "./components/Table/Table";

const App = () => {
  const [teachers, setTeachers] = createSignal([]);
  const [groups, setGroups] = createSignal([]);

  const handle = () => {
    console.log("asdfasdfasdf");
    setTeachers(["asd"]);
    setGroups(["adsf"]);
  };

  createEffect(() => {
    console.log("ddd");
    console.log(teachers());
    console.log(groups());
  });

  return <div>{0 ? <div onClick={handle}>test</div> : <Table></Table>}</div>;
};

export default App;
