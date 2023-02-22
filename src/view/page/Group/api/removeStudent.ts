import { FETCH_DOMAIN } from "../../../../constants";

export const api_removeStudent = (id: number, data: { groupId: null }) => {
  return fetch(FETCH_DOMAIN + "/api/students/" + id, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => err.message);
};

