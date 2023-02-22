import { Accessor, For, createSignal, createEffect } from "solid-js";
import { Group, Student } from "../interfaces";
import style from "./students.module.css";

interface Props {
  group: Accessor<Partial<Group>>;
  removeStudent: (id: number) => void;
}

function Students({ group, removeStudent }: Props) {
  const [students, setStudents] = createSignal(group().students || []);

  createEffect(() => {
    console.log(students());
    setStudents(group().students || []);
  });

  return (
    <div class={style.students}>
      <p class={style.sub_title}>Students</p>

      <label class={style.student_search}>
        <p>Search:</p>
        <input type="text" onChange={() => console.log("asdfasdf")}></input>
      </label>

      <div class={style.student_list}>
        <For fallback={<div>No Students</div>} each={group().students || []}>
          {(student: Student) => {
            return (
              <div class={style.student}>
                <p onClick={() => console.log("navigate to student")}>
                  {student.name}
                </p>
                <button onClick={() => removeStudent(student.id)}>
                  Remove
                </button>
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
}

export default Students;

