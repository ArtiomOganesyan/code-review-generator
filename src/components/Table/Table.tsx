import { createEffect, createSignal, For } from "solid-js";
import styles from "./table.module.css";
import "./table.css";

import { createSchedules, groups, teachers } from "../../data";

const Table = () => {
  const [twoItems, setTwoItems] = createSignal([]);

  const handleChange = (e: any) => {
    console.log(e.target);

    let element = e.target;

    if (element.tagName === "SPAN") {
      element = e.target.parentNode;
    }

    element.classList.add("active");
    setTwoItems([...twoItems(), element]);
  };

  createEffect(() => {
    const items = twoItems();
    if (items.length === 2) {
      const text = items[0].innerText;
      items[0].innerText = items[1].innerText;
      items[1].innerText = text;
      items.forEach((item) => item.classList.remove("active"));
      setTwoItems([]);
    }
  });

  const createHeaderRow = (
    title: string,
    cells: { changeable: boolean; text: string; group: string }[]
  ) => {
    return (
      <div class={styles.header_row}>
        <p>{title}</p>
        <div class={styles.subtitles}>
          <For each={cells}>
            {(cell) => (
              <div
                class={styles.cell}
                onClick={cell.changeable ? (e) => handleChange(e) : () => {}}
              >
                {cell.text}
                {"\n"}
                {cell.group}
              </div>
            )}
          </For>
        </div>
      </div>
    );
  };

  const schedule: { changeable: boolean; text: string; group: string }[] = [
    { changeable: false, text: "14:30 - 14:55", group: "" },
    { changeable: false, text: "15:00 - 14:25", group: "" },
    { changeable: false, text: "15:30 - 15:55", group: "" },
    { changeable: false, text: "16:00 - 16:25", group: "" },
    { changeable: false, text: "16:30 - 16:55", group: "" },
    { changeable: false, text: "17:00 - 17:25", group: "" },
  ];

  return (
    <div class={styles.table}>
      <div class={styles.container}>
        {createHeaderRow("Monday", schedule)}
        {createHeaderRow("Tuesday", schedule)}
        {createHeaderRow("Wednesday", schedule)}
        {createHeaderRow("Thursday", schedule)}
        {createHeaderRow("Friday", schedule)}

        <For each={createSchedules(teachers, groups)}>
          {(schedule) => createHeaderRow(schedule[0], schedule[1])}
        </For>
      </div>
    </div>
  );
};

export default Table;
