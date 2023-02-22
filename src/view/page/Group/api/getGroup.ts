import { FETCH_DOMAIN } from "../../../../constants";

export const api_getGroup = (id: number | string, cb: (arg: any) => void) => {
  fetch(FETCH_DOMAIN + "/api/groups/" + id + "?students", {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => cb(res))
    .catch((err) => console.log(err));
};

