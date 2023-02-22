import { useNavigate, useParams } from "@solidjs/router";
import { createEffect, createSignal, For } from "solid-js";
import { api_editGroupStudents, api_editGroup } from "./api/editGroup";
import { api_getGroup } from "./api/getGroup";
import { api_removeStudent } from "./api/removeStudent";
import style from "./group.module.css";
import { Group as IGroup } from "./interfaces";
import Info from "./module/Info";
import Students from "./module/Students";

function Group() {
  const params = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = createSignal<Partial<IGroup>>({});
  const [students, setStudents] = createSignal("");
  const [loading, setLoading] = createSignal(true);

  createEffect(() => {
    api_getGroup(params.groupId, setGroup);
  });

  const editGroup = () => {
    if (students()) {
      api_editGroupStudents(
        { names: students(), groupId: params.groupId },
        setGroup
      );
      setStudents("");
    }

    api_editGroup(params.groupId, {
      phase: group().phase,
      archive: group().archive,
    });
  };

  const removeStudent = async (id: number) => {
    const res = await api_removeStudent(id, { groupId: null });
    if (res.msg) {
      setGroup((prev) => ({
        ...prev,
        students: prev?.students
          ? prev.students.filter((student) => student.id !== id)
          : [],
      }));
    }
    console.log(res);
  };

  const inputHandle = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.type === "checkbox") {
      setGroup((prev) => ({ ...prev, archive: target.checked }));
    }
    setGroup((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const textAreaHandle = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    setStudents(target.value);
  };

  return (
    <div class={style.container}>
      <h2
        class={style.title}
        onClick={() => {
          navigate(-1);
        }}
      >
        {group().title}
      </h2>
      <Info
        group={group}
        students={students}
        textAreaHandle={textAreaHandle}
        editGroup={editGroup}
        inputHandle={inputHandle}
      ></Info>
      <Students group={group} removeStudent={removeStudent}></Students>
    </div>
  );
}

export default Group;

