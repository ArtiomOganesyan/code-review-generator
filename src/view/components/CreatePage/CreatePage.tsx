import { createSignal, For } from "solid-js";
import style from "./createpage.module.css";

const CreatePage = ({ teachers, setTeachers, groups, setGroups }: any) => {
  const [teacher, setTeacher] = createSignal("");
  const [error, setError] = createSignal("");

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
      <div>
        <p>{error()}</p>
        <h3>Add Teachers</h3>
        <input
          type="text"
          value={teacher()}
          // Why would you do this to yourself?
          onInput={(e: InputEvent) => {
            if (e.target) {
              // Is this being selfless?
              const input = e.target as HTMLInputElement;
              setTeacher(input.value);
            }
          }}
        />
        <button
          onClick={() => {
            if (teacher()) {
              if (!teachers().includes(teacher())) {
                setTeachers([...teachers(), teacher()]);
                setTeacher("");
                setError("");
              } else {
                setError("Teacher with this name already exists.");
              }
            }
          }}
        >
          +
        </button>
      </div>
      <div>
        <h3>Remove Teachers</h3>
        <div class={style.teacher_list}>
          <For each={teachers()}>
            {(t: string, i) => {
              return (
                <div>
                  <p>{t}</p>
                  <button
                    onClick={() => {
                      setTeachers((teachers: string[]) => {
                        const leftTeachers = teachers;
                        leftTeachers.splice(i(), 1);
                        return [...leftTeachers];
                      });
                    }}
                  >
                    X
                  </button>
                </div>
              );
            }}
          </For>
        </div>
      </div>
      <div>
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
      </div>
    </div>
  );
};

export default CreatePage;
