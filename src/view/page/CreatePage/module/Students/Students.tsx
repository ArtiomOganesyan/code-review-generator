import { useParams } from "@solidjs/router";
import { createSignal, createEffect } from "solid-js";
import { api_getStudents } from "./api/getStudents";

function Students() {
  const params = useParams();
  const [students, setStudents] = createSignal([]);

  createEffect(() => {
    api_getStudents(params.campus).then(console.log);
  });

  return <div>Students</div>;
}

export default Students;

