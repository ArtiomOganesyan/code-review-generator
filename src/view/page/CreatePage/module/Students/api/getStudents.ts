import { FETCH_DOMAIN } from "../../../../../../constants";

export const api_getStudents = (location: string) => {
  return fetch(FETCH_DOMAIN + "/api/students/?campus=" + location, {
    credentials: "include",
  })
    .then((res) => res.json())
    .catch((err) => err);
};

