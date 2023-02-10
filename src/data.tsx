import { Columns, Groups, Teachers } from "./type";

function createTable(teachers: Teachers, slots: number, days: number) {
  const columns: Columns = [];

  teachers.forEach((teacher: string) => {
    const t = new Array(days).fill(teacher).map((t, i) => {
      return [
        t,
        new Array(slots).fill("").map((_, j) => {
          if (j === 1) {
            return {
              changeable: false,
              text: "PedSoviet",
              group: "",
            };
          }
          if (i === 0 || i === 4) {
            return {
              changeable: true,
              text: "-----",
              group: "",
            };
          }
          return {
            changeable: true,
            text: "-----",
            group: "",
          };
        }),
      ];
    });

    columns.push(...(t as Columns));
  });

  return columns;
}

// Please forgive me for I have sinned. This is a scary function and the true flow of information in this function is somehow confusing even me.
// No matter who was the creator of this function. It is as if it created is self. True debugging it. Maybe it will be helpful. However, somehow
// I believe it won't. It was difficult to write this depressing function, so it will be difficult to read it.
export function createSchedules(teachers: Teachers, groups: Groups): Columns {
  const slots = 6;
  const days = 5;

  const columns = createTable(teachers, slots, days);

  const activeDays = Object.entries(
    [...columns].reduce((acc: any, cur) => {
      if (acc[cur[0]]) {
        acc[cur[0]].push(cur[1]);
      } else {
        acc[cur[0]] = [cur[1]];
      }
      return { ...acc };
    }, {})
  ).map((el: any) => {
    el[1].shift();
    el[1].pop();
    return el;
  });

  const week = [];

  for (let i = 0; i < 3; i++) {
    week[i] = activeDays.map((d) => {
      return d[1][i];
    });
  }

  let count = 0;
  for (let w = 0; w < 3; w++) {
    for (let i = 0; i < slots; i++) {
      for (let j = 0; j < teachers.length; j++) {
        if (i !== 1) {
          const student = groups[w]?.students.pop();
          week[w][j][i].text = student?.name ?? "-----";
        }
        count++;
      }
    }
    if (groups[w]?.students.length) {
      if (!groups[w + 1]) {
        groups[w + 1] = { students: [] };
      }

      groups[w + 1].students.push(...groups[w].students);
    }
  }

  return columns;
}
