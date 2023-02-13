import { createSignal, onMount } from "solid-js";

import "./app.css";
import Auth from "./view/page/Auth/Auth";
import CreatePage from "./view/page/CreatePage/CreatePage";
import Table from "./view/page/Table/Table";
import { FETCH_DOMAIN } from "./constants";
import { userStore } from "./state/user";
import { Groups } from "./type";
import Navbar from "./view/components/Navbar/Navbar";
import { Route, Routes } from "@solidjs/router";
import Teachers from "./view/page/CreatePage/components/Teachers/Teachers";
import Students from "./view/page/CreatePage/components/Students";
import GroupsComponent from "./view/page/CreatePage/components/Groups/Groups";
const t: Groups = [null, null, null];

const App = () => {
  const userState = userStore();

  const [teachers, setTeachers] = createSignal([]);
  const [groups, setGroups] = createSignal<Groups>([null, null, null]);
  const [loading, setLoading] = createSignal(true);

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
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <div>
      {loading() ? (
        <div class="spinner">Loading...</div>
      ) : (
        <div class="app">
          <Navbar></Navbar>
          <div class="container">
            <Routes>
              <Route
                path={"/"}
                element={<Table teachers={teachers} groups={groups}></Table>}
              ></Route>
              {userState.user ? (
                <Route
                  path={"/create-menu/:campus"}
                  element={
                    <CreatePage
                      teachers={teachers}
                      setTeachers={setTeachers}
                      groups={groups}
                      setGroups={setGroups}
                    ></CreatePage>
                  }
                >
                  {/* <Route path={"/"} element={<div>Pick</div>}></Route> */}
                  <Route
                    path="/teachers"
                    element={<Teachers></Teachers>}
                  ></Route>
                  <Route
                    path="/students"
                    element={<Students></Students>}
                  ></Route>
                  <Route
                    path={"/groups"}
                    element={<GroupsComponent></GroupsComponent>}
                  ></Route>
                </Route>
              ) : (
                <Route path={"/login"} element={<Auth></Auth>}></Route>
              )}
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

