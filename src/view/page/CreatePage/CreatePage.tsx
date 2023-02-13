import { Outlet } from "@solidjs/router";
import { createSignal, For } from "solid-js";
import CampusSwitch from "./components/CampusSwitch";
import Sidebar from "./components/Sidebar";
import style from "./createPage.module.css";

const CreatePage = ({ teachers, setTeachers, groups, setGroups }: any) => {
  const handleAddGroup = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    if (target) {
      const students = target.value.split("\n").map((student: string) => {
        return {
          id: Math.random(),
          name: student,
          groupId: Number(target.name),
          groupName: "",
        };
      });

      const newGroups = [...groups()];

      newGroups[Number(target.name) - 1] = { students };

      setGroups(newGroups);
    }
  };

  return (
    <div>
      <div class={style.menu}>
        <Sidebar></Sidebar>
        <CampusSwitch></CampusSwitch>
      </div>
      <Outlet></Outlet>

      {/* <div>
        <h3>Add Groups</h3>
        <textarea
          name="1"
          id="groupOne"
          cols="30"
          rows="10"
          onChange={handleAddGroup}
        />
        <textarea
          name="2"
          id="groupTwo"
          cols="30"
          rows="10"
          onChange={handleAddGroup}
        />
        <textarea
          name="3"
          id="groupThree"
          cols="30"
          rows="10"
          onChange={handleAddGroup}
        />
      </div> */}
    </div>
  );
};

export default CreatePage;

