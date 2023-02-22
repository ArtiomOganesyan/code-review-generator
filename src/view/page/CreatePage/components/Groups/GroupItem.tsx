import style from "./group_item.module.css";
import enterBtn from "../../../../../assets/images/enter_btn.png";
import { Group } from "./Groups";
import { createSignal } from "solid-js";
import { FETCH_DOMAIN } from "../../../../../constants";
import { Setter } from "solid-js/types/reactive/signal";
import { useNavigate } from "@solidjs/router";

interface Props {
  group: Group;
  setGroups: Setter<Group[]>;
  removeGroup: (id: number) => void;
}

function GroupItem({ group, setGroups, removeGroup }: Props) {
  const [currentGroup, setCurrentGroup] = createSignal(group);

  const navigate = useNavigate();

  const updateGroup = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.type === "checkbox") {
      return setCurrentGroup((prev) => ({
        ...prev,
        [target.name]: target.checked,
      }));
    }
    setCurrentGroup((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const submitUpdate = () => {
    const data = {
      ...currentGroup(),
      phase: currentGroup().phase + "",
    };
    fetch(FETCH_DOMAIN + "/api/groups/" + group.id, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      // TODO: duck-tape suka blyat phase should be a number always, however need this magic cause
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg) {
          setGroups((prev) => {
            return prev.map((group: Group) => {
              if (group.id === data.id) {
                return data;
              }
              return group;
            });
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div class={style.group}>
      <p
        class={group.archive ? style.archived_title : style.title}
        onDblClick={() => {
          navigate("/group/" + currentGroup().id);
        }}
      >
        {group.title}
      </p>
      <input
        class={style.update_phase}
        type="number"
        value={currentGroup().phase}
        min="1"
        max="3"
        name="phase"
        onChange={updateGroup}
        disabled={group.archive}
      />
      <label class={style.update_archive_label}>
        <input
          class={style.update_archive_input}
          type="checkbox"
          checked={group.archive}
          name="archive"
          onChange={updateGroup}
        />
        <span class={style.update_archive_span}></span>
      </label>
      <button
        class={style.update_btn}
        disabled={JSON.stringify(group) === JSON.stringify(currentGroup())}
        onClick={submitUpdate}
      >
        <img src={enterBtn} alt="update_btn" />
      </button>

      <button class={style.remove_btn} onClick={() => removeGroup(group.id)}>
        X
      </button>
    </div>
  );
}

export default GroupItem;

