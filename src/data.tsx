export const teachers: string[] = [
  "Oleg",
  "Artiom",
  "Roman",
  "Taras",
  "SergeyD",
  "SergeyM",
  "Denis",
].sort();

export const groups = [
  null,
  {
    students: new Array(40).fill("name").map((el, i) => ({
      id: Math.random(),
      name: "student" + i,
      groupId: 1,
      groupName: "Alpaca",
    })),
  },
  {
    students: new Array(18).fill("name").map((el, i) => ({
      id: Math.random(),
      name: "student " + i,
      groupId: 1,
      groupName: "Koala",
    })),
  },
];

type Columns = [
  string,
  { changeable: boolean; text: string; group: string }[]
][];

// export function createSchedules(
//   teachers: any[],
//   groups: [any, any, any]
// ): Columns {
//   const slots = 6;
//   const numOfTeachers = teachers.length;
//   const codeReviewForStudents: any = [];

//   groups.forEach((group) => {
//     if (group) {
//       group.students.forEach((student: any) =>
//         codeReviewForStudents.push(student)
//       );
//     }
//   });

//   const columns: Columns = [];

//   teachers.forEach((teacher: string) => {
//     const t = new Array(5).fill(teacher).map((t, i) => {
//       return [
//         t,
//         new Array(6).fill("").map((_, j) => {
//           if (j === 1) {
//             return {
//               changeable: false,
//               text: "PedSoviet",
//               group: "",
//             };
//           }
//           if (i === 0 || i === 4) {
//             return {
//               changeable: true,
//               text: "-----",
//               group: "",
//             };
//           }
//           return {
//             changeable: true,
//             text: "-----",
//             group: "",
//           };
//         }),
//       ];
//     });

//     columns.push(...(t as Columns));
//   });

//   let blockColumn = 0;
//   let flip = 4;
//   const columnsInIntrest = [];
//   const tuesday = [];
//   const wednesday = [];
//   const thursday = [];

//   columns.forEach((column, i) => {
//     console.log({ column, i });
//     if (blockColumn === i) {
//       blockColumn += flip;
//       if (flip === 4) {
//         flip = 1;
//       } else {
//         flip = 4;
//       }
//     } else {
//       columnsInIntrest.push(column);
//     }
//   });

//   columnsInIntrest.forEach((el, i) => {
//     console.log(el);
//     if (!(i % 3)) {
//       tuesday.push(el);
//       // columnsInIntrest[i] = "";
//     }
//   });
//   //   columnsInIntrest.forEach((el, i) => {
//   //     if (!(i % 2)) {
//   //       if (el) {
//   //         sortedByDay.push(el);
//   //         columnsInIntrest[i] = "";
//   //       }
//   //     }
//   //   });
//   //   columnsInIntrest.forEach((el, i) => {
//   //     if (el) {
//   //       sortedByDay.push(el);
//   //       columnsInIntrest[i] = "";
//   //     }
//   //   });

//   let count = 0;

//   for (let i = 0; i < slots; i++) {
//     for (let j = 0; j < numOfTeachers; j++) {
//       if (tuesday[j][1][i].changeable) {
//         tuesday[j][1][i].text = "student " + count++;
//       }
//     }
//   }

//   //   sortedByDay[14][1][0].text = "hello!";

//   console.log({ columns });

//   return columns;
// }

function createTable(teachers: string[], slots: number, days: number) {
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
export function createSchedules(
  teachers: string[],
  groups: [any, any, any]
): Columns {
  const slots = 6;
  const days = 5;
  const numOfTeachers = teachers.length;

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

  // assign students
  // expect the first slot of all teachers to be filled and next the others slots.

  // Doesn't really do what i need. First the first teacher gets all the students. Latter the next teacher and so on.
  // activeDays.forEach(([_, days], index) => {
  //   // console.log(days);
  //   days.forEach((day, i) => {
  //     if (groups[i]) {
  //       day.forEach((slot, j) => {
  //         if (j !== 1) {
  //           const student = groups[i].students.pop();
  //           console.log(student);
  //           slot.text = student?.name ?? "empty";
  //         }
  //       });
  //     }
  //   });
  // });

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
