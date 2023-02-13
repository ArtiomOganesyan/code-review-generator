import { FETCH_DOMAIN } from "../../../../constants";
import { formInitialState } from "./initialState";

export const registration = ({
  form,
  setForm,
  setErrors,
  secret,
  userState,
}: any): Promise<boolean> => {
  return fetch(FETCH_DOMAIN + "/api/auth/register", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...form(),
      secret: secret,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.statusCode >= 400) {
        let msg;
        Array.isArray(response.message)
          ? (msg = response.message)
          : (msg = [response.message]);
        setErrors(msg);
        throw new Error(response.message);
      }
      return fetch(FETCH_DOMAIN + "/api/auth/login", {
        method: "post",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: form().email,
          password: form().password,
        }),
      });
    })
    .then((response) => response.json())
    .then((result) => {
      setForm({ ...formInitialState });
      userState.logIn({ id: result.id, name: result.name });
      return true;
    })
    .catch((err) => {
      setTimeout(() => {
        setErrors([]);
      }, 10000);
      return false;
    });
};

export const login = ({
  form,
  setForm,
  setErrors,
  userState,
}: any): Promise<boolean> => {
  return fetch(FETCH_DOMAIN + "/api/auth/login", {
    method: "post",
    headers: { "content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email: form().email,
      password: form().password,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.statusCode >= 400) {
        let msg;
        Array.isArray(response.message)
          ? (msg = response.message)
          : (msg = [response.message]);
        setErrors(msg);
        throw new Error(response.message);
      }
      setForm({ ...formInitialState });
      userState.logIn({ id: response.id, name: response.name });
      return true;
    })
    .catch((err) => {
      setTimeout(() => {
        setErrors([]);
      }, 10000);
      return false;
    });
};

