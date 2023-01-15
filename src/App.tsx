import { createSignal } from "solid-js";

import "./app.css";
import CreatePage from "./components/CreatePage/CreatePage";
import Table from "./components/Table/Table";
import { Groups } from "./type";

const t: Groups = [null, null, null];

const App = () => {
  const [teachers, setTeachers] = createSignal([]);
  const [groups, setGroups] = createSignal<Groups>([null, null, null]);
  const [showCreateScreen, setShowCreateScreen] = createSignal(true);

  return (
    <div class="app">
      <button
        onClick={() => {
          setShowCreateScreen(!showCreateScreen());
        }}
      >
        Create Menu
      </button>
      {showCreateScreen() ? (
        <CreatePage
          teachers={teachers}
          setTeachers={setTeachers}
          groups={groups}
          setGroups={setGroups}
        ></CreatePage>
      ) : (
        <Table teachers={teachers} groups={groups}></Table>
      )}
    </div>
  );
};

export default App;
