import { Accessor, For } from "solid-js";
import style from "../auth.module.css";

function ErrorList({ errors }: { errors: Accessor<string[]> }) {
  return (
    <div class={errors().length ? style.form_errors : style.form_no_errors}>
      <p>It seems there is a problem:</p>
      <ul>
        <For each={errors()}>
          {(error) => <li class={style.form_error}>{error}</li>}
        </For>
      </ul>
    </div>
  );
}

export default ErrorList;

