import { createSignal, For } from "solid-js";
import { FETCH_DOMAIN } from "../../../constants";
import { userStore } from "../../../state/user";
import { registration, login } from "./utils/auth";
import { formInitialState } from "./utils/initialState";
import style from "./auth.module.css";
import ErrorList from "./components/ErrorList";
import { useNavigate } from "@solidjs/router";
console.log(style);

const Auth = () => {
  const userState = userStore();
  const navigate = useNavigate();

  const [form, setForm] = createSignal(formInitialState);
  const [errors, setErrors] = createSignal<string[]>([]);
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
    if (!e.target) {
      return;
    }
    e.preventDefault();
    const secret = localStorage.getItem("code_review_secret");
    const args = { form, setForm, setErrors, secret, userState };
    const result = showReg() ? registration(args) : login(args);
    const target = e.target as HTMLFormElement;
    result.then((res) => {
      if (res) {
        target.reset();
        navigate("/");
      }
    });
  };

  return (
    <div class={style.container}>
      <ErrorList errors={errors}></ErrorList>

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

