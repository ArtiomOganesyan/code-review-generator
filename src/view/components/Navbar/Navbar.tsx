import { A, useLocation } from "@solidjs/router";
import { FETCH_DOMAIN } from "../../../constants";
import { userStore } from "../../../state/user";
import style from "./navbar.module.css";
import logo from "../../../assets/images/elbrus_logo.jpg";

export default function Navbar() {
  const userState = userStore();
  const location = useLocation();

  const handleLogout = () => {
    fetch(FETCH_DOMAIN + "/api/auth/logout", {
      credentials: "include",
      method: "delete",
    })
      .then((response) => {
        userState.logOut();
      })
      .catch(console.error);
  };

  const forAuth = () => (
    <>
      <A
        class={`${style.link} ${
          location.pathname.includes("create") && style.active
        }`}
        href="/create-menu/msk/teachers"
      >
        Create Menu
      </A>
      <button type="button" class={style.button} onClick={handleLogout}>
        Logout
      </button>
    </>
  );

  const forUnAuth = () => (
    <A class={style.link} activeClass={style.active} end href="/login">
      Login
    </A>
  );

  return (
    <div class={style.navbar}>
      <div class={style.logo}>
        <img class={style.logo} src={logo} alt="logo" />
      </div>
      <div class={style.links}>
        <A class={style.link} end activeClass={style.active} href="/">
          Table
        </A>
        {userState.user?.id ? forAuth() : forUnAuth()}
      </div>
    </div>
  );
}

