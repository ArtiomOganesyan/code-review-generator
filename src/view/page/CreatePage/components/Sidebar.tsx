import { A, useParams } from "@solidjs/router";
import style from "../createPage.module.css";

function Sidebar() {
  const params = useParams();

  return (
    <>
      <A
        class={style.menu_item}
        activeClass={style.menu_item_active}
        href={`/create-menu/${params.campus}/teachers`}
      >
        Teachers
      </A>
      <A
        class={style.menu_item}
        activeClass={style.menu_item_active}
        href={`/create-menu/${params.campus}/students`}
      >
        Students
      </A>
      <A
        class={style.menu_item}
        activeClass={style.menu_item_active}
        href={`/create-menu/${params.campus}/groups`}
      >
        Groups
      </A>
    </>
  );
}

export default Sidebar;

