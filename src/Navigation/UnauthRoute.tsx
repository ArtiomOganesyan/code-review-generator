import { useNavigate } from "@solidjs/router";
import { JSX } from "solid-js";
import { userStore } from "../state/user";

function UnauthRoute({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const userState = userStore();

  if (!userState.user) {
    console.log(userState.user);
    console.log(userState);
    return children;
  }
  navigate("/");
  return null;
}

export default UnauthRoute;

