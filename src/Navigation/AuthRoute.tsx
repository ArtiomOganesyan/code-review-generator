import { useNavigate } from "@solidjs/router";
import { JSX } from "solid-js";
import { userStore } from "../state/user";

function AuthRoute({ children }: { children: JSX.Element }) {
  // const navigate = useNavigate();
  // const userState = userStore();

  // if (!userState.user) {
  //   navigate("/");
  //   return null;
  // }

  return children;
}

export default AuthRoute;

