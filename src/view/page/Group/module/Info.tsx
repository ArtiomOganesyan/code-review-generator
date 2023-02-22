import { Accessor, createSignal, createEffect } from "solid-js";
import { Group } from "../interfaces";
import style from "./info.module.css";

interface Props {
  group: Accessor<Partial<Group>>;
  students: Accessor<string>;
  textAreaHandle: (e: Event) => void;
  editGroup: () => void;
  inputHandle: (e: Event) => void;
}

function Info({
  group,
  students,
  textAreaHandle,
  editGroup,
  inputHandle,
}: Props) {
  return (
    <div class={style.info}>
      <p>{group().campus?.location.toUpperCase()} Campus</p>
      <p>Phase {group().phase}</p>
      <p>Archived {group().archive + ""}</p>
      <div class={style.menu}>
        <label class={`${style.menu_item} ${style.phase}`}>
          <span>Phase:</span>
          <input
            type="number"
            name="phase"
            min={"1"}
            max={"3"}
            value={group().phase}
            onChange={inputHandle}
          />
        </label>
        <label class={`${style.menu_item} ${style.archive}`}>
          <span>Archive</span>
          <input
            type="checkbox"
            checked={group().archive}
            onChange={inputHandle}
          />
        </label>
        <label class={`${style.menu_item} ${style.textarea}`}>
          <span>Add Students</span>
          <textarea onChange={textAreaHandle} value={students()} />
        </label>
        <button class={style.button} type="button" onClick={editGroup}>
          Edit
        </button>
      </div>
    </div>
  );
}

export default Info;

