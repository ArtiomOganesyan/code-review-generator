import { createSignal, For } from "solid-js";
import { FETCH_DOMAIN } from "../../../constants";
import { userStore } from "../../../state/user";
import { registration, login } from "./utils/auth";
import { formInitialState } from "./utils/initialState";
import style from "./auth.module.css";
console.log(style);

const Auth = () => {
  const userState = userStore();

  const [form, setForm] = createSignal(formInitialState);
  const [errors, setErrors] = createSignal([]);
  const [showReg, setShowReg] = createSignal(false);

  const handleForm = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.type === "checkbox") {
      setForm({ ...form(), [target.name]: target.checked });
    }
    setForm({ ...form(), [target.name]: target.value });
  };

  const handleToogle = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setShowReg(!!+target.value);
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const secret = localStorage.getItem("code_review_secret");
    const args = { form, setForm, setErrors, secret, userState };
    showReg() ? registration(args) : login(args);
  };

  return (
    <div class={style.container}>
      <div class={errors().length ? style.form_errors : style.form_no_errors}>
        <p>It seems there is a problem:</p>
        <ul>
          <For each={errors()}>
            {(error) => <li class={style.form_error}>{error}</li>}
          </For>
        </ul>
      </div>

      <form
        class={`${style.authForm} ${errors().length && style.authForm_error}`}
        onSubmit={handleSubmit}
      >
        <input
          class={`${style.form_part} ${
            showReg() ? style.visible : style.hidden
          }`}
          type="text"
          name="name"
          id="name"
          placeholder="name"
          onChange={handleForm}
        />
        <input
          class={style.form_part}
          type="text"
          name="email"
          id="email"
          placeholder="email"
          onChange={handleForm}
        />
        <input
          class={style.form_part}
          type="text"
          name="password"
          id="password"
          placeholder="password"
          onChange={handleForm}
        />
        <select
          class={`${style.form_part} ${
            showReg() ? style.visible : style.hidden
          }`}
          name="campus"
          onChange={handleForm}
        >
          <option selected disabled value="">
            Campus
          </option>
          <option value="msk">MSK</option>
          <option value="spb">SPB</option>
          <option value="online">Online</option>
        </select>
        <div
          class={`
          ${style.form_mentor}
          ${style.form_part}
          ${showReg() ? style.visible : style.hidden}
          `}
        >
          <label>Mentor</label>
          <input type="checkbox" name="mentor" onclick={handleForm} />
        </div>
        <button class={style.form_btn_submit} type="submit">
          submit
        </button>
        <div class={style.toggle}>
          <label for="radio1">Login</label>
          <input
            type="radio"
            name="form"
            id="radio1"
            checked
            value={0}
            onChange={handleToogle}
          />
          <input
            type="radio"
            name="form"
            id="radio2"
            value={1}
            onChange={handleToogle}
          />
          <label for="radio2">Registration</label>
        </div>
      </form>
    </div>
  );
};

export default Auth;

