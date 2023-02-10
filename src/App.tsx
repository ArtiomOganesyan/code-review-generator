import { createSignal, onMount } from "solid-js";

import "./app.css";
import Auth from "./view/components/Auth/Auth";
import CreatePage from "./view/components/CreatePage/CreatePage";
import Table from "./view/components/Table/Table";
import { FETCH_DOMAIN } from "./constants";
import { userStore } from "./state/user";
import { Groups } from "./type";
import Navbar from "./view/components/Navbar/Navbar";
const t: Groups = [null, null, null];

const App = () => {
  const userState = userStore();

  const [teachers, setTeachers] = createSignal([]);
  const [groups, setGroups] = createSignal<Groups>([null, null, null]);
  const [showCreateScreen, setShowCreateScreen] = createSignal(true);

  onMount(() => {
    fetch(FETCH_DOMAIN + "/api/auth", { credentials: "include" })
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
      })
      .then((r) => {
        if (r) userState.logIn({ name: r.name, id: r.id });
      })
      .catch(console.error);
  });

  return (
    <div class="app">
      <Navbar></Navbar>
      <div>
        {userState.user?.name}
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
      <Auth></Auth>
    </div>
  );
};

export default App;

