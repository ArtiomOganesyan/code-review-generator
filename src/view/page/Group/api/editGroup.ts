import { FETCH_DOMAIN } from "../../../../constants";
import { Student } from "../interfaces";

export const api_editGroupStudents = (
  data: { names: string; groupId: number | string },
  cb: (arg: any) => void
) => {
  fetch(FETCH_DOMAIN + "/api/students", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res: Student[]) => {
      cb((prev: any) => {
        const newStudents = [];
        if (prev?.students) {
          newStudents.push(...prev.students);
        }
        return {
          ...prev,
          students: [...newStudents, ...res],
        };
      });
    })
    .catch(console.error);
};

export const api_editGroup = (
  id: number | string,
  data: { phase?: number; archive?: boolean }
) => {
  fetch(FETCH_DOMAIN + "/api/groups/" + id, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.msg) {
        console.log(res);
        return;
      }
      console.log("something went wrong, please reload");
    })
    .catch(console.error);
};

