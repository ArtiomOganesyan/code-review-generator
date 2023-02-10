import { FETCH_DOMAIN } from "../../../constants";
import { userStore } from "../../../state/user";

export default function Navbar() {
  const userState = userStore();

  const handleLogout = () => {
    fetch(FETCH_DOMAIN + "/api/auth/logout", {
      credentials: "include",
      method: "delete",
    })
      .then((response) => {
        console.log(response);
        userState.logOut();
      })
      .catch(console.error);
  };

  const forAuth = () => (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );

  const forUnAuth = () => <div>login</div>;

  return (
    <div>
      Navbar
      {userState.user?.id ? forAuth() : forUnAuth()}
    </div>
  );
}

