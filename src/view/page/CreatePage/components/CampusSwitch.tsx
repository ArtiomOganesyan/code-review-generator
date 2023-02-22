import { useLocation, useNavigate, useParams } from "@solidjs/router";
import style from "../createPage.module.css";

function CampusSwitch() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const handleSwitch = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    const path = location.pathname.split("/");
    path[2] = target.value;
    navigate(path.join("/"));
  };

  return (
    <select class={style.switcher} onChange={handleSwitch}>
      <option selected={params.campus === "msk"} value="msk">
        msk
      </option>
      <option selected={params.campus === "spb"} value="spb">
        spb
      </option>
      <option selected={params.campus === "online"} value="online">
        online
      </option>
    </select>
  );
}

export default CampusSwitch;

