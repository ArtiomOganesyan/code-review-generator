import { useParams } from "@solidjs/router";
import { createEffect, createSignal, For } from "solid-js";
import { FETCH_DOMAIN } from "../../../../../constants";
import enterBtn from "../../../../../assets/images/enter_btn.png";
import style from "./groups.module.css";
import GroupItem from "./GroupItem";

export interface Group {
  id: number;
  title: string;
  phase: number | string;
  archive: boolean;
}

const groupInitialState = { title: "", phase: "1" };

function Groups() {
  const [group, setGroup] = createSignal(groupInitialState);
  const [groups, setGroups] = createSignal<Group[]>([]);
  const [error, setError] = createSignal("");
  const params = useParams();

  createEffect(() => {
    fetch(FETCH_DOMAIN + "/api/groups?campus=" + params.campus, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((d) => {
        setGroups(d);
      })
      .catch((e) => setError(e));
  });

  const groupSubmit = () => {
    fetch(FETCH_DOMAIN + "/api/groups", {
      method: "post",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...group(), location: params.campus }),
    })
      .then((r) => r.json())
      .then((group) => {
        if (group.statusCode >= 400) {
          throw new Error(group.message);
        }
        setGroup(groupInitialState);
        setGroups((prev) => [...prev, group]);
      })
      .catch((e) => setError(e.message));
  };

  const removeGroup = (id: number) => {
    fetch(FETCH_DOMAIN + "/api/groups/" + id, {
      method: "delete",
      credentials: "include",
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.msg) {
          setGroups((prev) => [...prev].filter((group) => group.id !== id));
        }
      })
      .catch((e) => setError(e.message));
  };

  const handleGroup = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setGroup((prev) => ({ ...prev, [target.name]: target.value + "" }));
  };

  return (
    <div>
      <h3 class={style.title}>Add Group</h3>
      <div class={style.add_group}>
        <input
          class={style.input}
          type="text"
          name="title"
          value={group().title}
          onChange={handleGroup}
        />
        <input
          class={`${style.input} ${style.phase_input}`}
          value={group().phase}
          name="phase"
          min="1"
          max="3"
          type="number"
          onChange={handleGroup}
        />
        <button type="submit" class={style.submit_btn} onClick={groupSubmit}>
          <img src={enterBtn} alt="submit" />
        </button>
      </div>
      <p class={style.error_msg}>{error()}</p>
      <h3 class={style.title}>Groups</h3>
      <div class={style.remove_group}>
        <div class={style.group_list}>
          <For each={groups()} fallback={<div>Please Add a Group</div>}>
            {(group: Group, i) => {
              return (
                <GroupItem
                  group={group}
                  setGroups={setGroups}
                  removeGroup={removeGroup}
                ></GroupItem>
              );
            }}
          </For>
        </div>
      </div>
    </div>
  );
}

export default Groups;

