import { useParams } from "@solidjs/router";
import { createEffect, createSignal, For, onMount } from "solid-js";
// import { FETCH_DOMAIN } from "../../../../../constants";
import style from "./groups.module.css";

interface Group {
  name: string;
  id: number;
}

function Groups() {
  const [group, setGroup] = createSignal("");
  const [groups, setGroups] = createSignal<Group[]>([]);
  const [error, setError] = createSignal("");
  const params = useParams();

  return (
    <div>
      <h3>Add Group</h3>
      <div class={style.add_teacher}>
        <input
          type="text"
          name="name"
          value={group()}
          // onChange={handleTeacher}
          // onKeyPress={inputEnterSubmit}
        />
        <button
          type="submit"
          class={style.submit_btn}
          //  onClick={teacherSubmit}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/60/60539.png"
            alt="submit"
          />
        </button>
      </div>
    </div>
  );
}

export default Groups;

// onMount(() => {
//   console.log("mount");
//   fetch(FETCH_DOMAIN + "/api/teachers?campus=" + params.campus, {
//     credentials: "include",
//   })
//     .then((r) => r.json())
//     .then((d) => setTeachers(d))
//     .catch((e) => setError(e));
// });

// createEffect(() => {
//   fetch(FETCH_DOMAIN + "/api/teachers?campus=" + params.campus, {
//     credentials: "include",
//   })
//     .then((r) => r.json())
//     .then((d) => setTeachers(d))
//     .catch((e) => setError(e));
// });

// const teacherSubmit = () => {
//   fetch(FETCH_DOMAIN + "/api/teachers", {
//     method: "post",
//     credentials: "include",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify({ name: teacher(), campus: params.campus }),
//   })
//     .then((r) => r.json())
//     .then((t) => {
//       if (t.statusCode >= 400) {
//         throw new Error(t.message);
//       }
//       setTeacher("");
//       setTeachers((prev) => [...prev, t]);
//       console.log(t);
//     })
//     .catch((e) => setError(e.message));
// };

// const inputEnterSubmit = (e: KeyboardEvent) => {
//   if (e.key === "Enter") {
//     handleTeacher(e);
//     teacherSubmit();
//   }
// };

// const removeTeacher = (id: number) => {
//   fetch(FETCH_DOMAIN + "/api/teachers/" + id, {
//     method: "delete",
//     credentials: "include",
//   })
//     .then((r) => r.json())
//     .then((r) => {
//       if (r.msg) {
//         setTeachers((prev) => [...prev].filter((el) => el.id !== id));
//       }
//     })
//     .catch((e) => setError(e.message));
// };

// const handleTeacher = (e: Event) => {
//   const target = e.target as HTMLInputElement;
//   setTeacher(target.value);
// };

//   return (
//     <div>

//       <p class={style.error_msg}>{error()}</p>
//       <h3>Remove Teachers</h3>
//       <div class={style.remove_teacher}>
//         <div class={style.teacher_list}>
//           <For each={teachers()} fallback={<div>Please Add Teachers</div>}>
//             {(t: Teacher, i) => {
//               return (
//                 <div class={style.teacher}>
//                   <p>{t.name}</p>
//                   <button
//                     class={style.remove_btn}
//                     onClick={() => removeTeacher(t.id)}
//                   >
//                     X
//                   </button>
//                 </div>
//               );
//             }}
//           </For>
//         </div>
//       </div>
//     </div>
//   );
// }

