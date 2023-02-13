import { A, useLocation } from "@solidjs/router";
import { createEffect } from "solid-js";
import { FETCH_DOMAIN } from "../../../constants";
import { userStore } from "../../../state/user";
import style from "./navbar.module.css";

export default function Navbar() {
  const userState = userStore();
  const location = useLocation();

  createEffect(() => {
    console.log(location.pathname);
  });

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
      login
    </A>
  );

  return (
    <div class={style.navbar}>
      <div class={style.logo}>
        <img
          class={style.logo}
          src="https://s.rbk.ru/v1_companies_s3/resized/1200xH/media/trademarks/fec750a1-c13b-454e-9109-5b4a84867b51.jpg"
          alt="logo"
        />
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

